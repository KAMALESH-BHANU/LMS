package org.example.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponseDTO {

    private String token;
    private String role;
    public LoginResponseDTO(String token) {
        this.token = token;
    }

    public LoginResponseDTO(String role, String token) {
        this.role = role;
        this.token = token;
    }
}

