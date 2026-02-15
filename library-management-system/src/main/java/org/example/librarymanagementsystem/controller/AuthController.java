package org.example.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.example.librarymanagementsystem.dto.*;
import org.example.librarymanagementsystem.model.*;
import org.example.librarymanagementsystem.repository.UserRepository;
import org.example.librarymanagementsystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController

@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final UserRepository userRepository;

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register( @RequestBody User request) {
        userService.register(request);
        return ResponseEntity.ok("Registered Submitted for Admin approval");
    }
    // 🔐 LOGIN
    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    // 🔁 FIRST LOGIN PASSWORD CHANGE
    @PutMapping("/api/auth/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        String response = userService.changePassword(request, email);

        return ResponseEntity.ok(response);
    }



}