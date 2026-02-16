package org.example.librarymanagementsystem.dto;

import lombok.*;

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
    private String approvalStatus;

}
