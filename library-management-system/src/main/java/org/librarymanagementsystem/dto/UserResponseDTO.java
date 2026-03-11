package org.librarymanagementsystem.dto;

import lombok.Data;

@Data
public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String approvalStatus;
    private Boolean active;
}