//package org.librarymanagementsystem.service;
//
//import org.librarymanagementsystem.constants.BookStatusConstants;
//import org.librarymanagementsystem.constants.IssueStatusConstants;
//import org.librarymanagementsystem.dto.IssueResponseDTO;
//import org.librarymanagementsystem.exception.BadRequestException;
//import org.librarymanagementsystem.model.Book;
//import org.librarymanagementsystem.model.Issue;
//import org.librarymanagementsystem.model.Member;
//import org.librarymanagementsystem.model.User;
//import org.librarymanagementsystem.repository.BookRepository;
//import org.librarymanagementsystem.repository.IssueRepository;
//import org.librarymanagementsystem.repository.MemberRepository;
//import org.librarymanagementsystem.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//@Service
//public class IssueService {
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private EmailService emailService;
//    private final IssueRepository issueRepository;
//    private final BookRepository bookRepository;
//    private final MemberRepository memberRepository;
//
//    public IssueService(IssueRepository issueRepository,
//                        BookRepository bookRepository,
//                        MemberRepository memberRepository) {
//
//        this.issueRepository = issueRepository;
//        this.bookRepository = bookRepository;
//        this.memberRepository = memberRepository;
//    }
//
//    // ISSUE BOOK
//    public Issue issueBook(Long bookId,
//                           Long memberId,
//                           LocalDate issueDate,
//                           LocalDate dueDate) {
//
//        Book book = bookRepository.findById(bookId)
//                .orElseThrow(() -> new BadRequestException("Book not found"));
//
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new BadRequestException("Member not found"));
//
//        if (book.getAvailableCopies() <= 0) {
//            throw new BadRequestException("Book not available");
//        }
//
//        Issue issue = new Issue();
//
//        issue.setBook(book);
//        issue.setMember(member);
//        issue.setIssueDate(issueDate);
//        issue.setDueDate(dueDate);
//        issue.setStatus(IssueStatusConstants.ISSUED);
//        issue.setPenalty(0.0);
//
//        // decrease available copies
//        book.setAvailableCopies(book.getAvailableCopies() - 1);
//
//        if (book.getAvailableCopies() == 0) {
//            book.setStatus(BookStatusConstants.OUT_OF_STOCK);
//        }
//
//        bookRepository.save(book);
//
//        Issue savedIssue = issueRepository.save(issue);
//
//        /* SEND EMAIL */
//
//        String studentEmail = member.getUser().getEmail();
//        String studentName = member.getUser().getFirstName()+" "+member.getUser().getLastName();
//
//        emailService.sendBookIssuedEmail(
//                studentEmail,
//                studentName,
//                book.getTitle(),
//                issueDate.toString(),
//                dueDate.toString()
//        );
//
//        return savedIssue;
//    }
//
//    // RETURN BOOK
//    public Issue returnBook(Long issueId, String returnType) {
//
//        Issue issue = issueRepository.findById(issueId)
//                .orElseThrow(() -> new BadRequestException("Issue not found"));
//
//        if (issue.getReturnDate() != null) {
//            throw new BadRequestException("Book already returned");
//        }
//
//        Book book = issue.getBook();
//
//        issue.setReturnDate(LocalDate.now());
//
//        double penalty = 0;
//
//        if ("LOST".equalsIgnoreCase(returnType)
//                || "DAMAGED".equalsIgnoreCase(returnType)) {
//
//            penalty = book.getMrp();
//            issue.setStatus(returnType.toUpperCase());
//
//        } else {
//
//            if (issue.getReturnDate().isAfter(issue.getDueDate())) {
//
//                long daysLate = ChronoUnit.DAYS.between(
//                        issue.getDueDate(),
//                        issue.getReturnDate());
//
//                penalty = daysLate * 10.0;
//            }
//
//            issue.setStatus(IssueStatusConstants.RETURNED);
//        }
//
//        issue.setPenalty(penalty);
//
//        // increase available copies
//        book.setAvailableCopies(book.getAvailableCopies() + 1);
//        book.setStatus(BookStatusConstants.AVAILABLE);
//
//        bookRepository.save(book);
//
//        Issue savedIssue = issueRepository.save(issue);
//
//        /* SEND EMAIL */
//
//
//        String studentEmail = issue.getMember().getUser().getEmail();
//        String studentName = issue.getMember().getUser().getFirstName()+" "+issue.getMember().getUser().getLastName();
//        if (penalty > 0) {
//
//            emailService.sendPenaltyEmail(
//                    studentEmail,
//                    studentName,
//                    book.getTitle(),
//                    (int) ChronoUnit.DAYS.between(issue.getDueDate(), issue.getReturnDate()),
//                    (int) penalty
//            );
//        }
//        emailService.sendBookReturnedEmail(
//                studentEmail,
//                studentName,
//                book.getTitle()
//        );
//
//        return savedIssue;
//    }
//
//    // GET ISSUES
//    public List<Issue> getIssues(String status, Long memberId) {
//
//        if (status != null) {
//            return issueRepository.findByStatus(status);
//        }
//
//        if (memberId != null) {
//            return issueRepository.findByMemberId(memberId);
//        }
//
//        return issueRepository.findAll();
//    }
//
//    // CHECK ISSUE STATUS
//    public Issue getIssueStatus(Long bookId, Long memberId) {
//
//        return issueRepository
//                .findByBookIdAndMemberIdAndReturnDateIsNull(bookId, memberId)
//                .orElse(null);
//    }
//    public List<IssueResponseDTO> getMyBooks(String email) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Member member = memberRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new RuntimeException("Member not found"));
//
//        List<Issue> issues = issueRepository.findByMember(member);
//
//        return issues.stream().map(issue -> {
//
//            IssueResponseDTO dto = new IssueResponseDTO();
//
//            dto.setId(issue.getId());
//            dto.setBookTitle(issue.getBook().getTitle());
//            dto.setMemberName(member.getUser().getFirstName());
//            dto.setIssueDate(issue.getIssueDate());
//            dto.setDueDate(issue.getDueDate());
//            dto.setReturnDate(issue.getReturnDate());
//            dto.setPenalty(issue.getPenalty());
//            dto.setStatus(issue.getStatus());
//            dto.setCoverImage(issue.getBook().getCoverImage());
//
//            boolean overdue =
//                    issue.getReturnDate() == null &&
//                            LocalDate.now().isAfter(issue.getDueDate());
//
//            dto.setOverdue(overdue);
//            return dto;
//
//        }).toList();
//    }
//    public Page<IssueResponseDTO> getBookHistory(
//            String email,
//            String keyword,
//            int page,
//            int size) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Member member = memberRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new RuntimeException("Member not found"));
//
//        Pageable pageable = PageRequest.of(page, size);
//
//        Page<Issue> issues;
//
//        if (keyword != null && !keyword.isEmpty()) {
//            issues = issueRepository
//                    .findByMemberAndBook_TitleContainingIgnoreCase(member, keyword, pageable);
//        } else {
//            issues = issueRepository.findByMember(member, pageable);
//        }
//
//        return issues.map(issue -> {
//            IssueResponseDTO dto = new IssueResponseDTO();
//
//            dto.setId(issue.getId());
//            dto.setBookTitle(issue.getBook().getTitle());
//            dto.setMemberName(member.getUser().getFirstName());
//            dto.setIssueDate(issue.getIssueDate());
//            dto.setDueDate(issue.getDueDate());
//            dto.setReturnDate(issue.getReturnDate());
//            dto.setPenalty(issue.getPenalty());
//            dto.setStatus(issue.getStatus());
//            dto.setCoverImage(issue.getBook().getCoverImage());
//
//            return dto;
//        });
//    }
//}
package org.librarymanagementsystem.service;

import org.librarymanagementsystem.constants.BookStatusConstants;
import org.librarymanagementsystem.constants.IssueStatusConstants;
import org.librarymanagementsystem.dto.IssueResponseDTO;
import org.librarymanagementsystem.exception.BadRequestException;
import org.librarymanagementsystem.model.Book;
import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.BookRepository;
import org.librarymanagementsystem.repository.IssueRepository;
import org.librarymanagementsystem.repository.MemberRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class IssueService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private final IssueRepository issueRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    public IssueService(IssueRepository issueRepository,
                        BookRepository bookRepository,
                        MemberRepository memberRepository) {

        this.issueRepository = issueRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    // ISSUE BOOK
    public Issue issueBook(Long bookId,
                           Long memberId,
                           LocalDate issueDate,
                           LocalDate dueDate) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BadRequestException("Book not found"));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("Member not found"));

        if (book.getAvailableCopies() <= 0) {
            throw new BadRequestException("Book not available");
        }

        Issue issue = new Issue();

        issue.setBook(book);
        issue.setMember(member);
        issue.setIssueDate(issueDate);
        issue.setDueDate(dueDate);
        issue.setStatus(IssueStatusConstants.ISSUED);
        issue.setPenalty(0.0);

        // decrease available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);

        if (book.getAvailableCopies() == 0) {
            book.setStatus(BookStatusConstants.OUT_OF_STOCK);
        }

        bookRepository.save(book);

        Issue savedIssue = issueRepository.save(issue);

        // SEND BOOK ISSUED EMAIL
        try {

            String studentEmail = member.getUser().getEmail();
            String studentName = member.getUser().getFirstName();

            emailService.sendBookIssuedEmail(
                    studentEmail,
                    studentName,
                    book.getTitle(),
                    issueDate.toString(),
                    dueDate.toString()
            );

        } catch (Exception e) {
            System.out.println("Email sending failed: " + e.getMessage());
        }

        return savedIssue;
    }


    // RETURN BOOK
    public Issue returnBook(Long issueId, String returnType) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new BadRequestException("Issue not found"));

        if (issue.getReturnDate() != null) {
            throw new BadRequestException("Book already returned");
        }

        Book book = issue.getBook();

        issue.setReturnDate(LocalDate.now());

        double penalty = 0;

        if ("LOST".equalsIgnoreCase(returnType)
                || "DAMAGED".equalsIgnoreCase(returnType)) {

            penalty = book.getMrp();
            issue.setStatus(returnType.toUpperCase());

        } else {

            if (issue.getReturnDate().isAfter(issue.getDueDate())) {

                long daysLate = ChronoUnit.DAYS.between(
                        issue.getDueDate(),
                        issue.getReturnDate());

                penalty = daysLate * 10.0;
            }

            issue.setStatus(IssueStatusConstants.RETURNED);
        }

        issue.setPenalty(penalty);

        // increase available copies
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        book.setStatus(BookStatusConstants.AVAILABLE);

        bookRepository.save(book);

        Issue savedIssue = issueRepository.save(issue);

        String studentEmail = issue.getMember().getUser().getEmail();
        String studentName = issue.getMember().getUser().getFirstName();

        // SEND RETURN EMAIL
        try {

            emailService.sendBookReturnedEmail(
                    studentEmail,
                    studentName,
                    book.getTitle()
            );

        } catch (Exception e) {
            System.out.println("Return email failed: " + e.getMessage());
        }

        // SEND PENALTY EMAIL (IF PENALTY EXISTS)
        if (penalty > 0) {

            try {

                long daysLate = ChronoUnit.DAYS.between(
                        issue.getDueDate(),
                        issue.getReturnDate());

                emailService.sendPenaltyEmail(
                        studentEmail,
                        studentName,
                        book.getTitle(),
                        (int) daysLate,
                        (int) penalty
                );

            } catch (Exception e) {
                System.out.println("Penalty email failed: " + e.getMessage());
            }

        }

        return savedIssue;
    }


    // GET ISSUES
    public List<Issue> getIssues(String status, Long memberId) {

        if (status != null) {
            return issueRepository.findByStatus(status);
        }

        if (memberId != null) {
            return issueRepository.findByMemberId(memberId);
        }

        return issueRepository.findAll();
    }


    // CHECK ISSUE STATUS
    public Issue getIssueStatus(Long bookId, Long memberId) {

        return issueRepository
                .findByBookIdAndMemberIdAndReturnDateIsNull(bookId, memberId)
                .orElse(null);
    }


    // MY BOOKS
    public List<IssueResponseDTO> getMyBooks(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        List<Issue> issues = issueRepository.findByMember(member);

        return issues.stream().map(issue -> {

            IssueResponseDTO dto = new IssueResponseDTO();

            dto.setId(issue.getId());
            dto.setBookTitle(issue.getBook().getTitle());
            dto.setMemberName(member.getUser().getFirstName());
            dto.setIssueDate(issue.getIssueDate());
            dto.setDueDate(issue.getDueDate());
            dto.setReturnDate(issue.getReturnDate());
            dto.setPenalty(issue.getPenalty());
            dto.setStatus(issue.getStatus());
            dto.setCoverImage(issue.getBook().getCoverImage());

            boolean overdue =
                    issue.getReturnDate() == null &&
                            LocalDate.now().isAfter(issue.getDueDate());

            dto.setOverdue(overdue);

            return dto;

        }).toList();
    }


    // BOOK HISTORY
    public Page<IssueResponseDTO> getBookHistory(
            String email,
            String keyword,
            int page,
            int size) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Pageable pageable = PageRequest.of(page, size);

        Page<Issue> issues;

        if (keyword != null && !keyword.isEmpty()) {
            issues = issueRepository
                    .findByMemberAndBook_TitleContainingIgnoreCase(member, keyword, pageable);
        } else {
            issues = issueRepository.findByMember(member, pageable);
        }

        return issues.map(issue -> {

            IssueResponseDTO dto = new IssueResponseDTO();

            dto.setId(issue.getId());
            dto.setBookTitle(issue.getBook().getTitle());
            dto.setMemberName(member.getUser().getFirstName());
            dto.setIssueDate(issue.getIssueDate());
            dto.setDueDate(issue.getDueDate());
            dto.setReturnDate(issue.getReturnDate());
            dto.setPenalty(issue.getPenalty());
            dto.setStatus(issue.getStatus());
            dto.setCoverImage(issue.getBook().getCoverImage());

            return dto;

        });
    }

}