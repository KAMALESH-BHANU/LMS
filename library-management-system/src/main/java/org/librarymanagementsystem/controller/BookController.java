//package org.example.librarymanagementsystem.controller;
//
//import jakarta.validation.Valid;
//import org.example.librarymanagementsystem.dto.BookRequestDTO;
//import org.example.librarymanagementsystem.dto.BookResponseDTO;
//import org.example.librarymanagementsystem.dto.PaginatedResponseDTO;
//import org.example.librarymanagementsystem.model.Book;
//import org.example.librarymanagementsystem.service.BookService;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/books")
//public class BookController {
//
//    private final BookService bookService;
//
//    public BookController(BookService bookService) {
//        this.bookService = bookService;
//    }
//
//    // POST /api/books
//    @PostMapping
//    public BookResponseDTO addBook(@Valid @RequestBody BookRequestDTO dto) {
//        return bookService.addBook(dto);
//    }
//
//    // GET /api/books
//    @GetMapping("/search")
//    public PaginatedResponseDTO<BookResponseDTO> searchBooks(
//            @RequestParam(required = false) String title,
//            @RequestParam(required = false) String author,
//            @RequestParam(required = false) String genre,
//            @RequestParam(required = false) String status,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "id") String sortBy,
//            @RequestParam(defaultValue = "asc") String direction) {
//
//        return bookService.searchBooks(
//                title, author, genre, status,
//                page, size, sortBy, direction);
//    }
//
//
//    // GET /api/books/{id}
//    @GetMapping("/{id}")
//    public Book getBook(@PathVariable Long id) {
//        return bookService.getBookById(id);
//    }
//
//    // PUT /api/books/{id}
//    @PutMapping("/{id}")
//    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
//        return bookService.updateBook(id, book);
//    }
//
//    // DELETE /api/books/{id}
//    @DeleteMapping("/{id}")
//    public void deleteBook(@PathVariable Long id) {
//        bookService.deleteBook(id);
//    }
//
//    // PATCH /api/books/{id}/availability
//    @PatchMapping("/{id}/availability")
//    public Book updateAvailability(@PathVariable Long id,
//                                   @RequestParam String status) {
//        return bookService.updateAvailability(id, status);
//    }
//    @GetMapping
//    public PaginatedResponseDTO<BookResponseDTO> getAllBooks(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "id") String sortBy,
//            @RequestParam(defaultValue = "asc") String direction) {
//
//        return bookService.getAllBooks(page, size, sortBy, direction);
//    }
//}

package org.librarymanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.BookRequestDTO;
import org.librarymanagementsystem.dto.BookResponseDTO;
import org.librarymanagementsystem.dto.PaginatedResponseDTO;
import org.librarymanagementsystem.service.BookService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // CREATE
    @PostMapping
    public BookResponseDTO addBook(@Valid @RequestBody BookRequestDTO dto) {
        return bookService.addBook(dto);
    }

    // GET ALL (with pagination + sorting)
    @GetMapping
    public PaginatedResponseDTO<BookResponseDTO> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return bookService.getAllBooks(page, size, sortBy, direction);
    }

    // SEARCH (multi-field)
    @GetMapping("/search")
    public PaginatedResponseDTO<BookResponseDTO> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return bookService.searchBooks(
                title, author, genre, status,
                page, size, sortBy, direction);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public BookResponseDTO getBook(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public BookResponseDTO updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookRequestDTO dto) {
        return bookService.updateBook(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    // UPDATE STATUS
    @PatchMapping("/{id}/availability")
    public BookResponseDTO updateAvailability(
            @PathVariable Long id,
            @RequestParam String status) {

        return bookService.updateAvailability(id, status);
    }
}