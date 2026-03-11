package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Data
@Setter
@Getter
public class IssueResponseDTO {

    private Long id;
    private String bookTitle;
    private String memberName;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private Double penalty;
    private String status;
    private Boolean overdue;
    private String coverImage;
}
