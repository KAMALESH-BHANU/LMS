package org.librarymanagementsystem.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class BookResponseDTO {

    private Long id;
    private String title;
    private String author;
    private String genre;
    private String publisher;
    private Double mrp;
    private Integer totalCopies;
    private Integer availableCopies;
    private String status;
    private String coverImage;
    private String isbn;

}