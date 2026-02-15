package org.example.librarymanagementsystem.controller;

import jakarta.validation.constraints.NotBlank;
import org.example.librarymanagementsystem.model.VerificationToken;
import org.example.librarymanagementsystem.service.VerificationTokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordController {

    private final VerificationTokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public PasswordController(VerificationTokenService tokenService,
                              PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/set-password")
    public String setPassword(
            @RequestParam String token,
            @RequestBody @NotBlank String newPassword) {

        VerificationToken vt = tokenService.validateToken(token);

        vt.getUser().setPassword(passwordEncoder.encode(newPassword));
        vt.getUser().setFirstLogin(false);

        return "Password set successfully";
    }
}
