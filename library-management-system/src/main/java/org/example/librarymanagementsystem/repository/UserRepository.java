package org.example.librarymanagementsystem.repository;


import org.example.librarymanagementsystem.model.User;
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


}

