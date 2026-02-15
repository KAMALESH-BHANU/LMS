package org.example.librarymanagementsystem.dto;

import jakarta.validation.constraints.DecimalMin;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Data
@Getter
@Setter
public class WorkDTO {

    private String companyName;
    private String designation;
    private Boolean currentlyWorking;

    private LocalDate startDate;
    private LocalDate endDate;

    @DecimalMin(value = "0.0", message = "CTC must be positive")
    private Double ctc;
    private String reasonForLeaving;

}