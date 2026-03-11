package org.librarymanagementsystem.service;

import org.librarymanagementsystem.dto.UserResponseDTO;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibrarianService {

    @Autowired
    private UserRepository userRepository;

    /* ===============================
       GET USERS (Search + Role + Pagination)
       =============================== */

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

    /* ===============================
       TOGGLE ACTIVE STATUS
       =============================== */

    public void toggleActive(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(!user.getActive());

        userRepository.save(user);
    }

    /* ===============================
       UPDATE ROLE
       =============================== */

    public void updateRole(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(role);

        userRepository.save(user);
    }

    /* ===============================
       DELETE USER
       =============================== */

    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);
    }

    /* ===============================
       CONVERT ENTITY → DTO
       =============================== */

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