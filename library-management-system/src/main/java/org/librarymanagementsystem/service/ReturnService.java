//package org.librarymanagementsystem.service;
//
//import lombok.RequiredArgsConstructor;
//import org.librarymanagementsystem.dto.ReturnRequestDTO;
//import org.librarymanagementsystem.model.Book;
//import org.librarymanagementsystem.model.Issue;
//import org.librarymanagementsystem.model.User;
//import org.librarymanagementsystem.repository.BookRepository;
//import org.librarymanagementsystem.repository.IssueRepository;
//import org.librarymanagementsystem.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ReturnService {
//
//    private final IssueRepository issueRepository;
//    private final BookRepository bookRepository;
//    private final UserRepository userRepository;
//    private final EmailService emailService;
//
//    // STUDENT REQUEST RETURN
//
//    public void requestReturn(Long issueId) {
//
//        Issue issue = issueRepository.findById(issueId)
//                .orElseThrow(() -> new RuntimeException("Issue not found"));
//
//        issue.setReturnRequested(true);
//
//        issueRepository.save(issue);
//
//        String studentName = issue.getMember().getUser().getFirstName();
//        String bookTitle = issue.getBook().getTitle();
//
//        /*
//         FETCH ADMIN + LIBRARIAN USERS
//        */
//        List<User> staff = userRepository.findByRoleIn(
//                Arrays.asList("ADMIN", "LIBRARIAN")
//        );
//
//        /*
//         SEND EMAIL TO ALL STAFF
//        */
//        for (User user : staff) {
//
//            try {
//
//                emailService.sendReturnRequestNotification(
//                        user.getEmail(),
//                        studentName,
//                        bookTitle
//                );
//
//            } catch (Exception e) {
//
//                System.out.println("Email failed for: " + user.getEmail());
//
//            }
//
//        }
//
//    }
//
//
//    // ADMIN VIEW REQUESTS
//
//    public List<ReturnRequestDTO> getReturnRequests() {
//
//        return issueRepository.findReturnRequests();
//
//    }
//
//
//    // ADMIN APPROVE RETURN
//
//    public void approveReturn(Long issueId) {
//
//        Issue issue = issueRepository.findById(issueId)
//                .orElseThrow(() -> new RuntimeException("Issue not found"));
//
//        issue.setStatus("RETURNED");
//        issue.setReturnDate(LocalDate.now());
//        issue.setReturnRequested(false);
//
//        Book book = issue.getBook();
//
//        book.setAvailableCopies(book.getAvailableCopies() + 1);
//
//        bookRepository.save(book);
//
//        issueRepository.save(issue);
//
//        /*
//         SEND EMAIL TO STUDENT
//        */
//
//        String studentEmail = issue.getMember().getUser().getEmail();
//        String studentName = issue.getMember().getUser().getFirstName();
//        String bookTitle = book.getTitle();
//
//        try {
//
//            emailService.sendReturnApprovedEmail(
//                    studentEmail,
//                    studentName,
//                    bookTitle
//            );
//
//        } catch (Exception e) {
//
//            System.out.println("Student email failed: " + e.getMessage());
//
//        }
//
//    }
//
//}
package org.librarymanagementsystem.service;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.ReturnRequestDTO;
import org.librarymanagementsystem.model.Book;
import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.BookRepository;
import org.librarymanagementsystem.repository.IssueRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReturnService {

    private final IssueRepository issueRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    // STUDENT REQUEST RETURN
    public void requestReturn(Long issueId) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setReturnRequested(true);

        issueRepository.save(issue);

        User student = issue.getMember().getUser();
        String studentName = student.getFirstName();
        String bookTitle = issue.getBook().getTitle();

        // Notification for student
        notificationService.createNotification(
                student,
                "Return Request Submitted",
                "Your return request for '" + bookTitle + "' has been submitted."
        );

        /*
         FETCH ADMIN + LIBRARIAN USERS
        */
        List<User> staff = userRepository.findByRoleIn(
                Arrays.asList("ADMIN", "LIBRARIAN")
        );

        /*
         SEND EMAIL + NOTIFICATION TO ALL STAFF
        */
        for (User user : staff) {

            try {

                emailService.sendReturnRequestNotification(
                        user.getEmail(),
                        studentName,
                        bookTitle
                );

                notificationService.createNotification(
                        user,
                        "New Return Request",
                        studentName + " requested return for '" + bookTitle + "'"
                );

            } catch (Exception e) {

                System.out.println("Email failed for: " + user.getEmail());

            }

        }

    }


    // ADMIN VIEW REQUESTS
    public List<ReturnRequestDTO> getReturnRequests() {

        return issueRepository.findReturnRequests();

    }


    // ADMIN APPROVE RETURN
    public void approveReturn(Long issueId) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setStatus("RETURNED");
        issue.setReturnDate(LocalDate.now());
        issue.setReturnRequested(false);

        Book book = issue.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);

        bookRepository.save(book);
        issueRepository.save(issue);

        /*
         SEND EMAIL + NOTIFICATION TO STUDENT
        */

        User student = issue.getMember().getUser();
        String studentEmail = student.getEmail();
        String studentName = student.getFirstName();
        String bookTitle = book.getTitle();

        try {

            emailService.sendReturnApprovedEmail(
                    studentEmail,
                    studentName,
                    bookTitle
            );

            notificationService.createNotification(
                    student,
                    "Return Approved",
                    "Your return request for '" + bookTitle + "' has been approved."
            );

        } catch (Exception e) {

            System.out.println("Student email failed: " + e.getMessage());

        }

    }

}