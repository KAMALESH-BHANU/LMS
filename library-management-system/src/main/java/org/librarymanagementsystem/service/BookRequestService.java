//package org.librarymanagementsystem.service;
//
//import org.librarymanagementsystem.dto.BookRequest.BookRequestDTO;
//import org.librarymanagementsystem.model.Book;
//import org.librarymanagementsystem.model.BookRequest;
//import org.librarymanagementsystem.model.Member;
//import org.librarymanagementsystem.model.User;
//import org.librarymanagementsystem.repository.BookRepository;
//import org.librarymanagementsystem.repository.BookRequestRepository;
//import org.librarymanagementsystem.repository.MemberRepository;
//import org.librarymanagementsystem.repository.UserRepository;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Service
//public class BookRequestService {
//
//    private final BookRequestRepository repository;
//    private final BookRepository bookRepository;
//    private final UserRepository userRepository;
//    private final MemberRepository memberRepository;
//    private final EmailService emailService;
//
//    public BookRequestService(BookRequestRepository repository,
//                              BookRepository bookRepository,
//                              UserRepository userRepository,
//                              MemberRepository memberRepository,
//                              EmailService emailService) {
//        this.repository = repository;
//        this.bookRepository = bookRepository;
//        this.userRepository = userRepository;
//        this.memberRepository = memberRepository;
//        this.emailService = emailService;
//    }
//
//    public BookRequest requestBook(Long bookId, String email) {
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Member member = memberRepository.findByUserId(user.getId())
//                .orElseThrow(() -> new RuntimeException("Member not found"));
//
//        Book book = bookRepository.findById(bookId)
//                .orElseThrow(() -> new RuntimeException("Book not found"));
//
//        BookRequest request = new BookRequest();
//        request.setBook(book);
//        request.setMember(member);
//        request.setRequestedTitle(book.getTitle());
//        request.setRequestedAuthor(book.getAuthor());
//        request.setStatus("PENDING");
//
//        BookRequest savedRequest = repository.save(request);
//
//        /*
//        SEND EMAIL TO ALL ADMIN + LIBRARIANS
//        */
//        List<User> staff = userRepository.findByRoleIn(
//                Arrays.asList("ADMIN", "LIBRARIAN")
//        );
//
//        String studentName = member.getUser().getFirstName();
//        String bookTitle = book.getTitle();
//
//        for (User staffUser : staff) {
//            try {
//                emailService.sendBookRequestNotification(
//                        staffUser.getEmail(),
//                        studentName,
//                        bookTitle
//                );
//            } catch (Exception e) {
//                System.out.println("Email failed for: " + staffUser.getEmail());
//            }
//        }
//
//        return savedRequest;
//    }
//
//    // Pagination support
//    public Page<BookRequestDTO> getAllRequests(Pageable pageable) {
//
//        return repository.findAll(pageable)
//                .map(this::convertToDTO);
//    }
//
//    public BookRequestDTO updateStatus(Long id, String status) {
//
//        BookRequest request = repository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Request not found"));
//
//        request.setStatus(status.toUpperCase());
//
//        BookRequest updated = repository.save(request);
//
//        String studentEmail = updated.getMember().getUser().getEmail();
//        String studentName = updated.getMember().getUser().getFirstName();
//        String bookTitle = updated.getRequestedTitle();
//
//        try {
//
//            if ("APPROVED".equalsIgnoreCase(status)) {
//
//                emailService.sendBookRequestApprovedEmail(
//                        studentEmail,
//                        studentName,
//                        bookTitle
//                );
//
//            } else if ("REJECTED".equalsIgnoreCase(status)) {
//
//                emailService.sendBookRequestRejectedEmail(
//                        studentEmail,
//                        studentName,
//                        bookTitle
//                );
//
//            }
//
//        } catch (Exception e) {
//
//            System.out.println("Email failed: " + studentEmail);
//
//        }
//
//        return convertToDTO(updated);
//    }
//
//    private BookRequestDTO convertToDTO(BookRequest request) {
//
//        BookRequestDTO dto = new BookRequestDTO();
//
//        dto.setId(request.getId());
//        dto.setRequestedTitle(request.getRequestedTitle());
//        dto.setRequestedAuthor(request.getRequestedAuthor());
//        dto.setStatus(request.getStatus());
//
//        if (request.getBook() != null) {
//            dto.setCoverImage(request.getBook().getCoverImage());
//            dto.setBookId(request.getBook().getId());
//        }
//
//        if (request.getMember() != null &&
//                request.getMember().getUser() != null) {
//
//            dto.setMemberName(request.getMember()
//                    .getUser()
//                    .getFirstName());
//
//            dto.setMemberEmail(request.getMember()
//                    .getUser()
//                    .getEmail());
//        } else {
//            dto.setMemberName("N/A");
//            dto.setMemberEmail("Anonymous");
//        }
//
//        return dto;
//    }
//
//    public Page<BookRequestDTO> getRequestsByStatus(String status, Pageable pageable) {
//
//        return repository.findByStatus(status, pageable)
//                .map(this::convertToDTO);
//    }
//}
package org.librarymanagementsystem.service;

import org.librarymanagementsystem.dto.BookRequest.BookRequestDTO;
import org.librarymanagementsystem.model.Book;
import org.librarymanagementsystem.model.BookRequest;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.BookRepository;
import org.librarymanagementsystem.repository.BookRequestRepository;
import org.librarymanagementsystem.repository.MemberRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class BookRequestService {

    private final BookRequestRepository repository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    public BookRequestService(BookRequestRepository repository,
                              BookRepository bookRepository,
                              UserRepository userRepository,
                              MemberRepository memberRepository,
                              EmailService emailService,
                              NotificationService notificationService) {
        this.repository = repository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    public BookRequest requestBook(Long bookId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        BookRequest request = new BookRequest();
        request.setBook(book);
        request.setMember(member);
        request.setRequestedTitle(book.getTitle());
        request.setRequestedAuthor(book.getAuthor());
        request.setStatus("PENDING");

        BookRequest savedRequest = repository.save(request);

        String studentName = member.getUser().getFirstName();
        String bookTitle = book.getTitle();

        /*
        NOTIFICATION FOR STUDENT
        */
        notificationService.createNotification(
                user,
                "Book Request Submitted",
                "Your request for '" + bookTitle + "' has been submitted."
        );

        /*
        SEND EMAIL + SYSTEM NOTIFICATION TO ADMIN + LIBRARIANS
        */
        List<User> staff = userRepository.findByRoleIn(
                Arrays.asList("ADMIN", "LIBRARIAN")
        );

        for (User staffUser : staff) {

            try {

                emailService.sendBookRequestNotification(
                        staffUser.getEmail(),
                        studentName,
                        bookTitle
                );

                notificationService.createNotification(
                        staffUser,
                        "New Book Request",
                        studentName + " requested book '" + bookTitle + "'"
                );

            } catch (Exception e) {

                System.out.println("Email failed for: " + staffUser.getEmail());

            }

        }

        return savedRequest;
    }

    // Pagination support
    public Page<BookRequestDTO> getAllRequests(Pageable pageable) {

        return repository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public BookRequestDTO updateStatus(Long id, String status) {

        BookRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(status.toUpperCase());

        BookRequest updated = repository.save(request);

        String studentEmail = updated.getMember().getUser().getEmail();
        String studentName = updated.getMember().getUser().getFirstName();
        String bookTitle = updated.getRequestedTitle();

        User student = updated.getMember().getUser();

        try {

            if ("APPROVED".equalsIgnoreCase(status)) {

                emailService.sendBookRequestApprovedEmail(
                        studentEmail,
                        studentName,
                        bookTitle
                );

                notificationService.createNotification(
                        student,
                        "Book Request Approved",
                        "Your request for '" + bookTitle + "' has been approved."
                );

            } else if ("REJECTED".equalsIgnoreCase(status)) {

                emailService.sendBookRequestRejectedEmail(
                        studentEmail,
                        studentName,
                        bookTitle
                );

                notificationService.createNotification(
                        student,
                        "Book Request Rejected",
                        "Your request for '" + bookTitle + "' has been rejected."
                );

            }

        } catch (Exception e) {

            System.out.println("Email failed: " + studentEmail);

        }

        return convertToDTO(updated);
    }

    private BookRequestDTO convertToDTO(BookRequest request) {

        BookRequestDTO dto = new BookRequestDTO();

        dto.setId(request.getId());
        dto.setRequestedTitle(request.getRequestedTitle());
        dto.setRequestedAuthor(request.getRequestedAuthor());
        dto.setStatus(request.getStatus());

        if (request.getBook() != null) {
            dto.setCoverImage(request.getBook().getCoverImage());
            dto.setBookId(request.getBook().getId());
        }

        if (request.getMember() != null &&
                request.getMember().getUser() != null) {

            dto.setMemberName(request.getMember()
                    .getUser()
                    .getFirstName());

            dto.setMemberEmail(request.getMember()
                    .getUser()
                    .getEmail());
        } else {
            dto.setMemberName("N/A");
            dto.setMemberEmail("Anonymous");
        }

        return dto;
    }

    public Page<BookRequestDTO> getRequestsByStatus(String status, Pageable pageable) {

        return repository.findByStatus(status, pageable)
                .map(this::convertToDTO);
    }
}