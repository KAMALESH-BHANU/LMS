package org.example.librarymanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Account Approved");
        message.setText("Your account has been approved.\n\nUsername: "
                + to + "\nPassword: " + password);

        mailSender.send(message);
    }


    public void sendPasswordSetupEmail(String email, String token) {
        // Later integrate JavaMailSender
        System.out.println(
                "Send email to " + email +
                        " with password setup link: http://localhost:8080/auth/set-password?token=" + token
        );
    }
    public void sendApprovalEmail(String email, String password) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Account Approved");
        message.setText(
                "Your account has been approved.\n\n" +
                        "Username: " + email + "\n" +
                        "Password: " + password +
                        "\n\nPlease change your password after login."
        );

        mailSender.send(message);
    }

}
