package org.librarymanagementsystem.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserApprovalDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dob;
    private String role;
    private String documentPath;
    private String status;
}
