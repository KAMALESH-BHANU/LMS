//package org.librarymanagementsystem.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendEmail(String to, String password) {
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Account Approved");
//        message.setText("Your account has been approved.\n\nUsername: "
//                + to + "\nPassword: " + password);
//
//        mailSender.send(message);
//    }
//
//
//    public void sendPasswordSetupEmail(String email, String token) {
//        // Later integrate JavaMailSender
//        System.out.println(
//                "Send email to " + email +
//                        " with password setup link: http://localhost:8080/auth/set-password?token=" + token
//        );
//    }
//    public void sendApprovalEmail(String email, String password) {
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//        message.setSubject("Account Approved");
//        message.setText(
//                "Your account has been approved.\n\n" +
//                        "Username: " + email + "\n" +
//                        "Password: " + password +
//                        "\n\nPlease change your password after login."
//        );
//
//        mailSender.send(message);
//    }
//
//}
package org.librarymanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private final String FROM_EMAIL = "dkkamaleshbhanu2006@gmail.com";


    /* ---------------- ACCOUNT APPROVAL ---------------- */

    public void sendApprovalEmail(String email, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Account Approved");

        message.setText(
                "Your Library account has been approved.\n\n" +
                        "Username: " + email + "\n" +
                        "Password: " + password + "\n\n" +
                        "Please change your password after login."
        );

        mailSender.send(message);
    }


    /* ---------------- BOOK ISSUED ---------------- */

    public void sendBookIssuedEmail(String email, String studentName,
                                    String bookTitle, String issueDate,
                                    String dueDate) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library: Book Issued Successfully");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "The following book has been issued to you:\n\n" +
                        "Book Title: " + bookTitle + "\n" +
                        "Issue Date: " + issueDate + "\n" +
                        "Due Date: " + dueDate + "\n\n" +
                        "Please return the book before the due date to avoid penalties."
        );

        mailSender.send(message);
    }


    /* ---------------- RETURN REQUEST SUBMITTED ---------------- */

    public void sendReturnRequestEmail(String adminEmail,
                                       String studentName,
                                       String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(adminEmail);
        message.setSubject("Return Request Submitted");

        message.setText(
                "A return request has been submitted.\n\n" +
                        "Student: " + studentName + "\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please review and approve the request."
        );

        mailSender.send(message);
    }
    public void sendBookRequestNotification(String email,
                                            String studentName,
                                            String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Book Request Submitted");

        message.setText(
                "A book request has been submitted.\n\n" +
                        "Student: " + studentName + "\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please review the request in the LMS admin panel."
        );

        mailSender.send(message);
    }


    /* ---------------- RETURN APPROVED ---------------- */

    public void sendReturnApprovedEmail(String email,
                                        String studentName,
                                        String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Return Request Approved");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your return request has been approved.\n\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please return the book to the library."
        );

        mailSender.send(message);
    }


    /* ---------------- RETURN REJECTED ---------------- */

    public void sendReturnRejectedEmail(String email,
                                        String studentName,
                                        String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Return Request Rejected");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your return request for the following book has been rejected.\n\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please contact the librarian for more details."
        );

        mailSender.send(message);
    }


    /* ---------------- BOOK RETURNED ---------------- */

    public void sendBookReturnedEmail(String email,
                                      String studentName,
                                      String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Book Returned Successfully");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your book has been successfully returned.\n\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Thank you for using the library."
        );

        mailSender.send(message);
    }


    /* ---------------- DUE DATE REMINDER ---------------- */

    public void sendDueReminderEmail(String email,
                                     String studentName,
                                     String bookTitle,
                                     String dueDate) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Reminder: Book Due Soon");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Reminder: Your borrowed book is due soon.\n\n" +
                        "Book: " + bookTitle + "\n" +
                        "Due Date: " + dueDate + "\n\n" +
                        "Please return it before the due date."
        );

        mailSender.send(message);
    }


    /* ---------------- OVERDUE NOTIFICATION ---------------- */

    public void sendOverdueEmail(String email,
                                 String studentName,
                                 String bookTitle,
                                 int penaltyAmount) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Notice: Book Overdue");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your borrowed book is overdue.\n\n" +
                        "Book: " + bookTitle + "\n" +
                        "Penalty Amount: ₹" + penaltyAmount + "\n\n" +
                        "Please return the book and pay the penalty."
        );

        mailSender.send(message);
    }


    /* ---------------- PENALTY APPLIED ---------------- */

    public void sendPenaltyEmail(String email,
                                 String studentName,
                                 String bookTitle,
                                 int daysOverdue,
                                 int amount) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Penalty Applied");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "A penalty has been applied.\n\n" +
                        "Book: " + bookTitle + "\n" +
                        "Days Overdue: " + daysOverdue + "\n" +
                        "Fine Amount: ₹" + amount + "\n\n" +
                        "Please clear the penalty at the library."
        );

        mailSender.send(message);
    }
    public void sendReturnRequestNotification(String email,
                                              String studentName,
                                              String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Library Return Request Submitted");

        message.setText(
                "A return request has been submitted.\n\n" +
                        "Student: " + studentName + "\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please review the request in the LMS admin panel."
        );

        mailSender.send(message);
    }
    public void sendBookRequestApprovedEmail(String email,
                                             String studentName,
                                             String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Book Request Approved");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your book request has been approved.\n\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "You can collect the book from the library."
        );

        mailSender.send(message);
    }


    public void sendBookRequestRejectedEmail(String email,
                                             String studentName,
                                             String bookTitle) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject("Library Book Request Rejected");

        message.setText(
                "Hello " + studentName + ",\n\n" +
                        "Your book request has been rejected.\n\n" +
                        "Book: " + bookTitle + "\n\n" +
                        "Please contact the librarian for more details."
        );

        mailSender.send(message);
    }


}