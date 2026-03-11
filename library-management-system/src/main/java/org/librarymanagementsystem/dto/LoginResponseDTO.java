package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponseDTO {

    private String token;
    private String role;
    private boolean firstLogin;
    private Long memberId;
    public LoginResponseDTO(String token) {
        this.token = token;
    }

    public LoginResponseDTO(String token, String role, Long memberId) {

        this.token = token;
        this.role=role;
        this.memberId=memberId;
    }
    public LoginResponseDTO(String token, String role,boolean firstLogin,Long memberId) {

        this.token = token;
        this.role=role;
        this.firstLogin=firstLogin;
        this.memberId=memberId;
    }

}

