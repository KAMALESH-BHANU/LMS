package org.example.librarymanagementsystem.service;

import lombok.Data;
import org.example.librarymanagementsystem.dto.*;

import org.example.librarymanagementsystem.exception.EmailAlreadyExistsException;
import org.example.librarymanagementsystem.model.*;
import org.example.librarymanagementsystem.repository.UserRepository;
import org.example.librarymanagementsystem.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.librarymanagementsystem.security.JwtUtil;

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

    public void register(User request) {

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered.");
        }


        User user = new User();

        // ---- Personal ----
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());
        user.setRole(request.getRole());
        user.setGender(request.getGender());
        user.setMaritalStatus(request.getMaritalStatus());

        // 🔥 Generate Password
        String rawPassword = PasswordGenerator.generatePassword(8);

        // Encrypt password
        String encodedPassword = passwordEncoder.encode(rawPassword);

        user.setPassword(encodedPassword);
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

        if (user.getFirstLogin()) {
            return new LoginResponseDTO(
                    "PASSWORD_CHANGE_REQUIRED"
            );
        }

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new LoginResponseDTO(token,user.getRole());
    }

    public String changePassword(ChangePasswordRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {

            throw new RuntimeException("Old password incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setFirstLogin(false);

        userRepository.save(user);

        return "Password changed successfully";
    }
}
