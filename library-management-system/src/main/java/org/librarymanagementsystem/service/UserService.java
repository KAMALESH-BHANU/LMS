package org.librarymanagementsystem.service;

import lombok.Data;
import org.librarymanagementsystem.dto.*;

import org.librarymanagementsystem.dto.ChangePasswordRequest;
import org.librarymanagementsystem.dto.LoginRequest;
import org.librarymanagementsystem.dto.LoginResponseDTO;
import org.librarymanagementsystem.exception.EmailAlreadyExistsException;
import org.librarymanagementsystem.model.*;
import org.librarymanagementsystem.model.Academic;
import org.librarymanagementsystem.model.Address;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.model.Work;
import org.librarymanagementsystem.repository.UserRepository;
import org.librarymanagementsystem.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.librarymanagementsystem.security.JwtUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Data
@Service

public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;


    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    /* =========================
       USER REGISTRATION
       ========================= */

    public void register(User request, MultipartFile document) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered.");
        }

        User user = new User();

        // ---------------- PERSONAL ----------------
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(email);
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());
        user.setRole(request.getRole());
        user.setGender(request.getGender());
        user.setMaritalStatus(request.getMaritalStatus());

        // ---------------- PASSWORD ----------------
        String rawPassword = PasswordGenerator.generatePassword(8);
        user.setPassword(passwordEncoder.encode(rawPassword));

        // ---------------- FILE UPLOAD ----------------
        if (document != null && !document.isEmpty()) {

            try {

                // File size limit (2MB)
                if (document.getSize() > 2 * 1024 * 1024) {
                    throw new RuntimeException("File size exceeds 2MB limit");
                }

                String uploadDir = "uploads/documents/";
                File directory = new File(uploadDir);

                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String fileName = System.currentTimeMillis() + "_" + document.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                Files.copy(document.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                user.setDocumentPath(fileName);

            } catch (IOException e) {
                throw new RuntimeException("File upload failed");
            }
        }
        // ---- Address ----
        Address address = new Address();
        address.setStreet(request.getAddress().getStreet());
        address.setCity(request.getAddress().getCity());
        address.setState(request.getAddress().getState());
        address.setPincode(request.getAddress().getPincode());

        address.setUser(user);
        user.setAddress(address);

        // ---- Academic ----
        Academic academic = new Academic();
        academic.setInstitution(request.getAcademic().getInstitution());
        academic.setDegree(request.getAcademic().getDegree());
        academic.setYear(request.getAcademic().getYear());
        academic.setGrade(request.getAcademic().getGrade());
        academic.setPercentage(request.getAcademic().getPercentage());

        academic.setUser(user);
        user.setAcademic(academic);

        // ---- Work ----
        if (request.getWorks() != null && !request.getWorks().isEmpty()) {

            for (Work workDTO : request.getWorks()) {

                Work work = new Work();
                work.setCompanyName(workDTO.getCompanyName());
                work.setDesignation(workDTO.getDesignation());
                work.setCurrentlyWorking(workDTO.getCurrentlyWorking());
                work.setStartDate(workDTO.getStartDate());
                work.setEndDate(workDTO.getEndDate());
                work.setCtc(workDTO.getCtc());
                work.setReasonForLeaving(workDTO.getReasonForLeaving());

                work.setUser(user);
                user.getWorks().add(work);
            }
        }

        // 🔥 THIS IS WHERE IT IS USED
        userRepository.save(user);
    }


    /* =========================
       USER LOGIN
       ========================= */
    public LoginResponseDTO login(LoginRequest request) {


        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // 🔹 Account status validation
        if (user.getApprovalStatus() .equals("PENDING")) {
            throw new RuntimeException("Your account is pending admin approval");
        }

        if (user.getApprovalStatus().equals("REJECTED")) {
            throw new RuntimeException("Your account was rejected");
        }

        if (user.getApprovalStatus().equals("BLOCKED")) {
            throw new RuntimeException("Your account is blocked");
        }

        // 🔹 Authenticate password
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (DisabledException e) {
            throw new RuntimeException("Your account is not approved by admin");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

//        if (user.getFirstLogin()) {
//            return new LoginResponseDTO(
//                    "PASSWORD_CHANGE_REQUIRED"
//            );
//        }

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        if (user.getFirstLogin()) {
            return new LoginResponseDTO(token,user.getRole(),user.getFirstLogin(),user.getMember().getId());
        }

        return new LoginResponseDTO(token,user.getRole(),user.getMember().getId());
    }

    public String changePassword(ChangePasswordRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setFirstLogin(false);

        userRepository.save(user);

        return "Password updated successfully";
    }
}
