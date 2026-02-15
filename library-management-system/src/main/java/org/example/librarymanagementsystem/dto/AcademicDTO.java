package org.example.librarymanagementsystem.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Data
@Getter
@Setter
public class AcademicDTO {

    @NotBlank(message = "Institution is required")
    private String institution;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotNull(message = "Passing year is required")
    @Min(value = 1900, message = "Invalid year")
    @Max(value = 2100, message = "Invalid year")
    private Integer year;


    private String grade;

    @NotNull(message = "Percentage is required")
    @DecimalMin(value = "0.0", message = "Invalid percentage")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")
    private BigDecimal percentage;

}

