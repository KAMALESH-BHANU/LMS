package org.librarymanagementsystem.repository;


import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<Issue, Long> {

    // ✅ Count ONLY books with status = ISSUED
    int countByMemberAndStatus(Member member, String status);

    // ✅ Total borrowed (all time)
    int countByMember(Member member);
}