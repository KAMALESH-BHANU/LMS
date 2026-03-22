package org.librarymanagementsystem.service;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.*;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ GET USER FROM JWT
    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ GET PROFILE
    public ProfileResponse getProfile(Authentication auth) {
        User user = getUser(auth);

        return ProfileResponse.builder()
                .name(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .build();
    }

    // ✅ UPDATE PROFILE
    public ProfileResponse updateProfile(Authentication auth, ProfileUpdateRequest req) {
        User user = getUser(auth);

        // split name (simple logic)
        String[] parts = req.getName().split(" ");
        user.setFirstName(parts[0]);
        if (parts.length > 1) user.setLastName(parts[1]);

        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());

        userRepository.save(user);

        return getProfile(auth);
    }

    // ✅ CHANGE PASSWORD
    public void changePassword(Authentication auth, ChangePasswordRequest req) {
        User user = getUser(auth);

        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
    }

    // ✅ SECURITY
    public SecurityResponse getSecurity(Authentication auth) {
        User user = getUser(auth);

        return SecurityResponse.builder()
                .twoFAEnabled(user.isTwoFAEnabled())
                .build();
    }

    // ✅ TOGGLE 2FA
    public SecurityResponse toggle2FA(Authentication auth) {
        User user = getUser(auth);

        user.setTwoFAEnabled(!user.isTwoFAEnabled());
        userRepository.save(user);

        return SecurityResponse.builder()
                .twoFAEnabled(user.isTwoFAEnabled())
                .build();
    }

    // ✅ ACTIVITY (SIMPLE MOCK OR DB BASED)
    public List<ActivityResponse> getActivity(Authentication auth) {
        return List.of(
                new ActivityResponse("Logged in", "2 hours ago"),
                new ActivityResponse("Updated Profile", "Yesterday")
        );
    }
}