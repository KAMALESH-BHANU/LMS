package org.example.librarymanagementsystem.service;

import org.example.librarymanagementsystem.model.ApprovalStatus;
import org.example.librarymanagementsystem.model.User;
import org.example.librarymanagementsystem.repository.BookRepository;
import org.example.librarymanagementsystem.repository.IssueRepository;
import org.example.librarymanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class AdminService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    private BookRepository bookRepository;
//    private IssueRepository issueRepository;
//
//    public DashboardStats getDashboardStats() {
//
//        long totalMembers = userRepository.countByRole("STUDENT");
//        long totalBooks = bookRepository.count();
//        long issuedBooks = issueRepository.countByStatus("ISSUED");
//        long pendingApprovals = userRepository.countByStatus(ApprovalStatus.PENDING);
//        long overdueBooks = issueRepository.countOverdueBooks();
//
//        return new DashboardStats(
//                totalMembers,
//                totalBooks,
//                issuedBooks,
//                pendingApprovals,
//                overdueBooks
//        );
//    }
//
    public List<User> getPendingUsers() {
        return userRepository.findByApprovalStatues("PENDING");
    }
    public String approveUser(Long userId){
        User u= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Pending user not found"));
        u.setApprovedBy("ADMIN");
        u.setApprovedDate(LocalDateTime.now());
        u.setApprovalStatus("ACCEPTED");
        String rawPassword = generateRandomPassword();
        u.setPassword(passwordEncoder.encode(rawPassword));
        emailService.sendApprovalEmail(u.getEmail(), rawPassword);

        return "Approved and credentials sent";
    }
    public String rejectUser(Long userId){
        User u= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Pending user not found"));
        u.setApprovalStatus("REJECTED");
        userRepository.deleteById(userId);
        return "User is Rejected";
    }
    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

}

