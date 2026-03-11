package org.librarymanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class MemberSearchDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}