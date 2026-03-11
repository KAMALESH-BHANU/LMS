package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("""
        SELECT b FROM Book b
        WHERE (:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:author IS NULL OR LOWER(b.author) LIKE LOWER(CONCAT('%', :author, '%')))
        AND (:genre IS NULL OR LOWER(b.genre) LIKE LOWER(CONCAT('%', :genre, '%')))
        AND (:status IS NULL OR b.status = :status)
    """)
    Page<Book> searchBooks(
            @Param("title") String title,
            @Param("author") String author,
            @Param("genre") String genre,
            @Param("status") String status,
            Pageable pageable
    );

    long countByStatus(String status);

    @Query("SELECT b.genre, COUNT(b) FROM Book b GROUP BY b.genre")
    List<Object[]> countBooksByGenre();
    long countByMrpLessThan(Double price);
    long countByMrpBetween(Double min, Double max);
    long countByMrpGreaterThan(Double price);
}