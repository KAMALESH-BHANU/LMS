package org.librarymanagementsystem.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookHistoryDTO {

    private Long id;

    private String title;

    private String author;

    private String coverUrl;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private String status;
}