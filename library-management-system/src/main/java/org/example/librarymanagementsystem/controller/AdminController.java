package org.example.librarymanagementsystem.controller;

import org.example.librarymanagementsystem.dto.AdminUserApprovalDTO;
import org.example.librarymanagementsystem.model.ApprovalStatus;
import org.example.librarymanagementsystem.model.User;
import org.example.librarymanagementsystem.repository.UserRepository;
import org.example.librarymanagementsystem.service.AdminService;
import org.example.librarymanagementsystem.service.EmailService;
import org.example.librarymanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private  AdminService adminService;
    @Autowired
    private UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    public AdminController(UserRepository userRepository, EmailService emailService) {

        //this.adminService = adminService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

//    @GetMapping("/stats")
//    public DashboardStats getStats() {
//        return adminService.getDashboardStats();
//    }

    @GetMapping("/pending-users")
    public List<AdminUserApprovalDTO> getPendingUsers() {
        return adminService.getPendingUsers();
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

}
