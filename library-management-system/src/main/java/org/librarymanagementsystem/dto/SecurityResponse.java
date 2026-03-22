package org.librarymanagementsystem.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class SecurityResponse {
    private boolean twoFAEnabled;
}
