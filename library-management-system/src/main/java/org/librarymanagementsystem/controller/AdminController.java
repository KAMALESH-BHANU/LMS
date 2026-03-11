package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.dto.AdminUserApprovalDTO;
import org.librarymanagementsystem.dto.UpdateRoleDTO;
import org.librarymanagementsystem.dto.UserResponseDTO;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.BookRepository;
import org.librarymanagementsystem.repository.IssueRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.librarymanagementsystem.service.AdminService;
import org.librarymanagementsystem.service.EmailService;
import org.librarymanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private  AdminService adminService;
    @Autowired
    private UserService userService;

    private final EmailService emailService;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;
    public AdminController( EmailService emailService) {

        //this.adminService = adminService;

        this.emailService = emailService;
    }

//    @GetMapping("/stats")
//    public DashboardStats getStats() {
//        return adminService.getDashboardStats();
//    }

//    @GetMapping("/pending-users")
//    public List<AdminUserApprovalDTO> getPendingUsers() {
//        return adminService.getPendingUsers();
//    }
@GetMapping("/pending-users")
public Page<AdminUserApprovalDTO> getPendingUsers(Pageable pageable) {
    return adminService.getPendingUsers(pageable);
}

    // ✅ Approve user
    @PutMapping("/approve/{pendingId}")
    public ResponseEntity<String> approveUser(
            @PathVariable Long pendingId){
        adminService.approveUser(pendingId);

        return ResponseEntity.ok("User approved successfully");
    }

    @DeleteMapping("/reject/{userId}")
    public ResponseEntity<String> rejectUser(@PathVariable Long userId) {
        adminService.rejectUser(userId);
        return ResponseEntity.ok("Sorry User Rejected");
    }

    @PutMapping("/block/{userId}")
    public ResponseEntity<String> blockUser(@PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setApprovalStatus("BLOCKED");
        userRepository.save(user);

        return ResponseEntity.ok("User Blocked");
    }
    @GetMapping
    public Page<UserResponseDTO> getAllUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            Pageable pageable
    ) {
        return adminService.getAllUsers(search, role, pageable);
    }

    @PatchMapping("/{id}/toggle")
    public void toggleActive(@PathVariable Long id) {
        adminService.toggleActive(id);
    }

    @PatchMapping("/{id}/role")
    public void updateRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleDTO dto
    ) {
        adminService.updateRole(id, dto.getRole());
    }
    @GetMapping("/dashboard")
    public Map<String, Long> getDashboardStats() {

        long totalBooks = bookRepository.count();
        long totalMembers = userRepository.countByRoleAndApprovalStatus("STUDENT", "APPROVED");
        totalMembers = totalMembers + userRepository.countByRoleAndApprovalStatus("LIBRARIAN", "APPROVED");
        long totalIssues = issueRepository.countByStatus("ISSUED");
        long availableBooks = bookRepository.countByStatus("AVAILABLE");

        Map<String, Long> stats = new HashMap<>();
        stats.put("books", totalBooks);
        stats.put("members", totalMembers);
        stats.put("issues", totalIssues);
        stats.put("available", availableBooks);

        return stats;
    }
    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {

        Map<String, Object> response = new HashMap<>();

        // Member counts
        long students = userRepository.countByRoleAndApprovalStatus("STUDENT", "APPROVED");
        long librarians = userRepository.countByRoleAndApprovalStatus("LIBRARIAN", "APPROVED");

        response.put("members", Map.of(
                "students", students,
                "librarians", librarians
        ));

        // Genre counts
        List<Object[]> genreData = bookRepository.countBooksByGenre();
        Map<String, Long> genreMap = new HashMap<>();
        for (Object[] row : genreData) {
            genreMap.put((String) row[0], (Long) row[1]);
        }
        response.put("genres", genreMap);

        // Price ranges
        response.put("priceRanges", Map.of(
                "below200", bookRepository.countByMrpLessThan(200.0),
                "200to500", bookRepository.countByMrpBetween(200.0, 500.0),
                "500to1000", bookRepository.countByMrpBetween(500.0, 1000.0),
                "above1000", bookRepository.countByMrpGreaterThan(1000.0)
        ));

        // Issue stats
        response.put("issues", Map.of(
                "issued", issueRepository.countByStatus("ISSUED"),
                "returned", issueRepository.countByStatus("RETURNED"),
                "lost", issueRepository.countByStatus("LOST")
        ));

        return response;
    }

    @GetMapping("/document/{userId}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long userId) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String fileName = user.getDocumentPath();

            if (fileName == null || fileName.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            String projectDir = System.getProperty("user.dir");

            Path filePath = Paths.get(projectDir, "uploads", "documents", fileName)
                    .normalize();

            System.out.println("Looking for file at: " + filePath);

            if (!filePath.toFile().exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            // 🔥 Auto-detect file type (JPEG, PNG, PDF, etc.)
            String contentType = java.nio.file.Files.probeContentType(filePath);

            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}



