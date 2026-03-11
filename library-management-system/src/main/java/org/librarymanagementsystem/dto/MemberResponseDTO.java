package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Data
@Setter
@Getter

public class MemberResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String planName;
    private LocalDate membershipStart;
    private LocalDate membershipExpiry;

}