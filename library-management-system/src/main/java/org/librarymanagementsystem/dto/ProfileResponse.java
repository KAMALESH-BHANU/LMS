package org.librarymanagementsystem.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class ProfileResponse {
    private String name;
    private String email;
    private String phone;
    private String role;
}