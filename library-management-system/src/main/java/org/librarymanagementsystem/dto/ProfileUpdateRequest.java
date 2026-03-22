package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ProfileUpdateRequest {
    private String name;
    private String email;
    private String phone;
}
