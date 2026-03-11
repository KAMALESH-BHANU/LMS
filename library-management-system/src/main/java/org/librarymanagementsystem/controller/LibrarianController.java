package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.dto.UpdateRoleDTO;
import org.librarymanagementsystem.dto.UserResponseDTO;
import org.librarymanagementsystem.repository.BookRepository;
import org.librarymanagementsystem.repository.IssueRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.librarymanagementsystem.service.LibrarianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/lib")
public class LibrarianController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private LibrarianService librarianService;
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
    @GetMapping
    public Page<UserResponseDTO> getAllUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            Pageable pageable
    ) {
        return librarianService.getAllUsers(search, role, pageable);
    }

    /* ================= TOGGLE ACTIVE ================= */

    @PatchMapping("/{id}/toggle")
    public void toggleActive(@PathVariable Long id) {
        librarianService.toggleActive(id);
    }

    /* ================= UPDATE ROLE ================= */

    @PatchMapping("/{id}/role")
    public void updateRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleDTO dto
    ) {
        librarianService.updateRole(id, dto.getRole());
    }

    /* ================= DELETE USER ================= */

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        librarianService.deleteUser(id);
    }
}

