package org.librarymanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.*;
import org.librarymanagementsystem.model.*;
import org.librarymanagementsystem.dto.ChangePasswordRequest;
import org.librarymanagementsystem.dto.LoginRequest;
import org.librarymanagementsystem.dto.LoginResponseDTO;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.UserRepository;
import org.librarymanagementsystem.service.*;
import org.librarymanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController

@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @PostMapping(
            value = "/api/auth/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> register(
            @RequestPart("data") String userJson,
            @RequestPart("document") MultipartFile document
    ) throws Exception {


        User request = objectMapper.readValue(userJson, User.class);

        userService.register(request, document);

        return ResponseEntity.ok("Registered. Submitted for Admin approval");
    }
    // 🔐 LOGIN
    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    // 🔁 FIRST LOGIN PASSWORD CHANGE
    @PutMapping("/api/auth/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        // 🔐 Get logged-in user's email from JWT
        String email = authentication.getName();

        String response = userService.changePassword(request, email);

        return ResponseEntity.ok(response);
    }



}