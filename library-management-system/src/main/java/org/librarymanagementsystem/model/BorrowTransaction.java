package org.librarymanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@Table(name = "borrow_transactions")
public class BorrowTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Book info
    private String title;
    private String author;
    private String coverUrl;

    // Member who borrowed
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    // BORROWED / RETURNED / OVERDUE
    private String status;
}