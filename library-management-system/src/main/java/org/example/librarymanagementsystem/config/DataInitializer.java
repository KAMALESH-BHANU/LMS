package org.example.librarymanagementsystem.config;
import org.example.librarymanagementsystem.model.ApprovalStatus;
import org.example.librarymanagementsystem.model.User;
import org.example.librarymanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner createDefaultAdmin() {
        return args -> {

            String adminEmail = "admin@gmail.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setRole("ADMIN");
                admin.setApprovalStatus("APPROVED");
                admin.setFirstLogin(false);

                userRepository.save(admin);

                System.out.println("Default admin created successfully.");
            }
        };
    }
}
