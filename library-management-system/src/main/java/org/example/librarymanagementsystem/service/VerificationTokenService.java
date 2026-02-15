package org.example.librarymanagementsystem.service;

import org.example.librarymanagementsystem.model.User;
import org.example.librarymanagementsystem.model.VerificationToken;
import org.example.librarymanagementsystem.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenService {

    private final VerificationTokenRepository repository;

    public VerificationTokenService(VerificationTokenRepository repository) {
        this.repository = repository;
    }

    public VerificationToken createToken(User user) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiryTime(LocalDateTime.now().plusHours(24));
        return repository.save(token);
    }

    public VerificationToken validateToken(String tokenValue) {
        VerificationToken token = repository.findByToken(tokenValue)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }
        return token;
    }
}
