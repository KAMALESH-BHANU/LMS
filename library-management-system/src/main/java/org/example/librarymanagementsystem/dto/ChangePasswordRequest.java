package org.example.librarymanagementsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ChangePasswordRequest {

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}
