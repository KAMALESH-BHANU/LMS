package org.librarymanagementsystem.service;

import org.librarymanagementsystem.dto.AdminUserApprovalDTO;
import org.librarymanagementsystem.dto.UserResponseDTO;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.model.MembershipPlan;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.MemberRepository;
import org.librarymanagementsystem.repository.MemberShipPlanRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberShipPlanRepository memberShipPlanRepository;


//    public List<AdminUserApprovalDTO> getPendingUsers() {
//
//        return userRepository.findPendingUsers();
//    }
      public Page<AdminUserApprovalDTO> getPendingUsers(Pageable pageable) {
           return userRepository.findPendingUsers(pageable);
      }
    @Transactional
    public String approveUser(Long userId){
        User u= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Pending user not found"));
        u.setApprovedBy("ADMIN");
        u.setApprovedDate(LocalDateTime.now());
        u.setApprovalStatus("APPROVED");
        String rawPassword = generateRandomPassword();
        u.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(u);
        emailService.sendApprovalEmail(u.getEmail(), rawPassword);
        if (!memberRepository.existsByUserId(u.getId())) {

            Member member = new Member();
            member.setUser(u);
            member.setMembershipStart(LocalDate.now());
            member.setMembershipExpiry(LocalDate.now().plusYears(1)); // example 1-year validity

            // Optional:m assign default membership plan
            MembershipPlan defaultPlan = memberShipPlanRepository
                    .findByName("BASIC");

            member.setPlan(defaultPlan);

            memberRepository.save(member);
        }
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
    // ===============================
    // Get All Users (Search + Role + Pagination)
    // ===============================

    public Page<UserResponseDTO> getAllUsers(
            String search,
            String role,
            Pageable pageable
    ) {

        List<String> allowedRoles = List.of("STUDENT", "LIBRARIAN");

        if (search != null && search.isBlank()) {
            search = null;
        }

        if (role != null && role.isBlank()) {
            role = null;
        }

        Page<User> page = userRepository.searchApprovedUsers(
                allowedRoles,
                role,
                search,
                pageable
        );

        return page.map(this::convertToDTO);
    }
    // ===============================
    // Toggle Active Status
    // ===============================

    public void toggleActive(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(!user.getActive());

        userRepository.save(user);
    }

    // ===============================
    // Update Role
    // ===============================

    public void updateRole(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(role);

        userRepository.save(user);
    }

    // ===============================
    // Convert to DTO
    // ===============================

    private UserResponseDTO convertToDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setFullName(user.getFirstName() + " " + user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setApprovalStatus(user.getApprovalStatus());
        dto.setActive(user.getActive());

        return dto;
    }
}