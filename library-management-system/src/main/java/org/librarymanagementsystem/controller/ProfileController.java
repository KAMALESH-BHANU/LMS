package org.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.*;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // ✅ GET PROFILE
    @GetMapping
    public ResponseEntity<?> getProfile(Authentication auth) {
        return ResponseEntity.ok(profileService.getProfile(auth));
    }

    // ✅ UPDATE PROFILE
    @PutMapping
    public ResponseEntity<?> updateProfile(
            Authentication auth,
            @RequestBody ProfileUpdateRequest request
    ) {
        return ResponseEntity.ok(profileService.updateProfile(auth, request));
    }

    // ✅ CHANGE PASSWORD
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            Authentication auth,
            @RequestBody ChangePasswordRequest request
    ) {
        profileService.changePassword(auth, request);
        return ResponseEntity.ok("Password updated successfully");
    }

    // ✅ GET SECURITY
    @GetMapping("/security")
    public ResponseEntity<?> getSecurity(Authentication auth) {
        return ResponseEntity.ok(profileService.getSecurity(auth));
    }

    // ✅ TOGGLE 2FA
    @PutMapping("/toggle-2fa")
    public ResponseEntity<?> toggle2FA(Authentication auth) {
        return ResponseEntity.ok(profileService.toggle2FA(auth));
    }

    // ✅ ACTIVITY (OPTIONAL)
    @GetMapping("/activity")
    public ResponseEntity<?> getActivity(Authentication auth) {
        return ResponseEntity.ok(profileService.getActivity(auth));
    }
}