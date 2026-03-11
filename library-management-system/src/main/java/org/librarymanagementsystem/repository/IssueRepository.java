package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.dto.ReturnRequestDTO;
import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByStatus(String status);

    List<Issue> findByMemberId(Long memberId);
    long countByStatus(String status);
    List<Issue> findByMember(Member member);
    Page<Issue> findByMember(Member member, Pageable pageable);
    List<Issue> findByMemberOrderByIssueDateDesc(Member member);
    Optional<Issue> findByBookIdAndMemberIdAndReturnDateIsNull(Long bookId, Long memberId);
    Page<Issue> findByMemberAndBook_TitleContainingIgnoreCase(
            Member member,
            String keyword,
            Pageable pageable
    );
    @Query("""
        SELECT new org.librarymanagementsystem.dto.ReturnRequestDTO(
            i.id,
            b.title,
            CONCAT(u.firstName,' ',u.lastName),
            b.coverImage,
            i.issueDate,
            i.dueDate
        )
        FROM Issue i
        JOIN i.book b
        JOIN i.member m
        JOIN m.user u
        WHERE i.returnRequested = true
    """)
    List<ReturnRequestDTO> findReturnRequests();
}
