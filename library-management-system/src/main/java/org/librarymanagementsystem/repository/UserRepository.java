package org.librarymanagementsystem.repository;


import org.librarymanagementsystem.dto.AdminUserApprovalDTO;
import org.librarymanagementsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (for login or duplicate check)
    Optional<User> findByEmail(String email);


    // Check if email already exists
    boolean existsByEmail(String email);
    @Query("SELECT a FROM User a WHERE a.approvalStatus = :status")
    public List<User> findByApprovalStatus(@Param("status") String status);

    Page<User> findByRoleIn(List<String> roles, Pageable pageable);
    List<User> findByRoleIn(List<String> roles);

    Page<User> findByRoleInAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            List<String> roles,
            String firstName,
            String lastName,
            String email,
            Pageable pageable
    );
    Page<User> findByRole(String role, Pageable pageable);
    @Query("""
       SELECT u FROM User u
       WHERE u.role IN :roles
       AND u.approvalStatus = 'APPROVED'
       AND (:role IS NULL OR u.role = :role)
       AND (
            :search IS NULL OR
            LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR
            LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR
            LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))
       )
       """)
    Page<User> searchApprovedUsers(
            @Param("roles") List<String> roles,
            @Param("role") String role,
            @Param("search") String search,
            Pageable pageable
    );
    long countByRoleAndApprovalStatus(String role, String approvalStatus);

    @Query("""
    SELECT new org.librarymanagementsystem.dto.AdminUserApprovalDTO(
        u.id,
        u.firstName,
        u.lastName,
        u.email,
        u.dob,
        u.role,
        u.documentPath,
        u.approvalStatus
    )
    FROM User u
    WHERE u.approvalStatus = 'PENDING'
    """)
    Page<AdminUserApprovalDTO> findPendingUsers(Pageable pageable);

}

