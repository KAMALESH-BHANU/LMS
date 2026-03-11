package org.librarymanagementsystem.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

public class MemberRequestDTO {

    @NotBlank
    private String name;

    @Email
    private String email;

    private String phone;

    private Long planId;

}
