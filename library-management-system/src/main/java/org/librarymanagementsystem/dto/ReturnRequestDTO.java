package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class ReturnRequestDTO {

    private Long issueId;
    private String bookTitle;
    private String studentName;
    private String coverImage;
    private LocalDate issueDate;
    private LocalDate dueDate;

    public ReturnRequestDTO(
            Long issueId,
            String bookTitle,
            String studentName,
            String coverImage,
            LocalDate issueDate,
            LocalDate dueDate
    ) {
        this.issueId = issueId;
        this.bookTitle = bookTitle;
        this.studentName = studentName;
        this.coverImage = coverImage;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
    }
}