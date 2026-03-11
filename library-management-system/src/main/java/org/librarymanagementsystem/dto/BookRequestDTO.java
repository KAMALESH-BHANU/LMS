package org.librarymanagementsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class BookRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    private String genre;
    private String publisher;

    @NotNull
    @Positive
    private Double mrp;

    @NotNull
    @Positive
    private Integer totalCopies;
    @NotBlank
    private String isbn;
    private String coverImage;
}