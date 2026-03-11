package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findByPlanName(String planName);

    @Query("""
        SELECT i FROM Issue i 
        WHERE i.member.id = :memberId
        ORDER BY i.issueDate DESC
    """)
    List<Object> getBorrowingHistory(@Param("memberId") Long memberId);

    Optional<Member> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @Query("""
           SELECT new org.librarymanagementsystem.dto.MemberSearchDTO(
               m.id,
               u.firstName,
               u.lastName,
               u.email
           )
           FROM Member m
           JOIN m.user u
           WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           """)
    List<org.librarymanagementsystem.dto.MemberSearchDTO> searchMembers(String keyword);
}