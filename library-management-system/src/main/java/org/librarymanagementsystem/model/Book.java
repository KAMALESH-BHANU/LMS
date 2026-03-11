package org.librarymanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(unique = true, nullable = false)
    private String isbn;

    private String genre;
    private String author;
    private String publisher;

    private Double mrp;

    private Integer totalCopies;
    private Integer availableCopies;

    @Column(nullable = false)
    @Pattern(regexp = "AVAILABLE|ISSUED|OUT_OF_STOCK")
    private String status;

    @Column(length = 1000)
    private String coverImage;

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private List<Issue> issuedBooks;
}