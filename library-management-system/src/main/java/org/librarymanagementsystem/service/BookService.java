
//package org.librarymanagementsystem.service;
//
//import lombok.RequiredArgsConstructor;
//import org.librarymanagementsystem.constants.BookStatusConstants;
//import org.librarymanagementsystem.dto.BookRequestDTO;
//import org.librarymanagementsystem.dto.BookResponseDTO;
//import org.librarymanagementsystem.dto.PaginatedResponseDTO;
//import org.librarymanagementsystem.exception.ResourceNotFoundException;
//import org.librarymanagementsystem.mapper.BookMapper;
//import org.librarymanagementsystem.model.Book;
//import org.librarymanagementsystem.repository.BookRepository;
//import org.springframework.data.domain.*;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class BookService {
//
//    private final BookRepository bookRepository;
//
//    // CREATE
//    public BookResponseDTO addBook(BookRequestDTO dto) {
//
//        Book book = BookMapper.toEntity(dto);
//        book.setAvailableCopies(book.getTotalCopies());
//        book.setStatus(BookStatusConstants.AVAILABLE);
//        book.setCoverImage(dto.getCoverImage());
//        return BookMapper.toDTO(bookRepository.save(book));
//    }
//
//    // GET BY ID
//    public BookResponseDTO getBookById(Long id) {
//        Book book = bookRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
//
//        return BookMapper.toDTO(book);
//    }
//
//    // GET ALL
//    public PaginatedResponseDTO<BookResponseDTO> getAllBooks(
//            int page, int size, String sortBy, String direction) {
//
//        Pageable pageable = PageRequest.of(
//                page,
//                size,
//                direction.equalsIgnoreCase("asc")
//                        ? Sort.by(sortBy).ascending()
//                        : Sort.by(sortBy).descending()
//        );
//
//        Page<Book> pageResult = bookRepository.findAll(pageable);
//
//        List<BookResponseDTO> content = pageResult.getContent()
//                .stream()
//                .map(BookMapper::toDTO)
//                .toList();
//
//        return buildPaginatedResponse(pageResult, content);
//    }
//
//    // SEARCH (multi-field filtering)
//    public PaginatedResponseDTO<BookResponseDTO> searchBooks(
//            String title,
//            String author,
//            String genre,
//            String status,
//            int page,
//            int size,
//            String sortBy,
//            String direction) {
//
//        Pageable pageable = PageRequest.of(
//                page,
//                size,
//                direction.equalsIgnoreCase("asc")
//                        ? Sort.by(sortBy).ascending()
//                        : Sort.by(sortBy).descending()
//        );
//
//        Page<Book> pageResult =
//                bookRepository.searchBooks(title, author, genre, status, pageable);
//
//        List<BookResponseDTO> content = pageResult.getContent()
//                .stream()
//                .map(BookMapper::toDTO)
//                .toList();
//
//        return buildPaginatedResponse(pageResult, content);
//    }
//
//    // UPDATE
//    public BookResponseDTO updateBook(Long id, BookRequestDTO dto) {
//
//        Book book = bookRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
//
//        book.setTitle(dto.getTitle());
//        book.setAuthor(dto.getAuthor());
//        book.setGenre(dto.getGenre());
//        book.setPublisher(dto.getPublisher());
//        book.setMrp(dto.getMrp());
//        book.setTotalCopies(dto.getTotalCopies());
//        book.setIsbn(dto.getIsbn());
//        return BookMapper.toDTO(bookRepository.save(book));
//    }
//
//    // DELETE
//    public void deleteBook(Long id) {
//
//        Book book = bookRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
//
//        if (book.getAvailableCopies() < book.getTotalCopies()) {
//            throw new RuntimeException("Cannot delete issued book");
//        }
//
//        bookRepository.delete(book);
//    }
//
//    // UPDATE STATUS
//    public BookResponseDTO updateAvailability(Long id, String status) {
//
//        Book book = bookRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
//
//        book.setStatus(status);
//
//        return BookMapper.toDTO(bookRepository.save(book));
//    }
//
//    private PaginatedResponseDTO<BookResponseDTO> buildPaginatedResponse(
//            Page<Book> pageResult,
//            List<BookResponseDTO> content) {
//
//        return new PaginatedResponseDTO<>(
//                content,
//                pageResult.getNumber(),
//                pageResult.getSize(),
//                pageResult.getTotalElements(),
//                pageResult.getTotalPages(),
//                pageResult.isLast()
//        );
//    }
//}

package org.librarymanagementsystem.service;
import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.constants.BookStatusConstants;
import org.librarymanagementsystem.dto.BookRequestDTO;
import org.librarymanagementsystem.dto.BookResponseDTO;
import org.librarymanagementsystem.dto.PaginatedResponseDTO;
import org.librarymanagementsystem.exception.ResourceNotFoundException;
import org.librarymanagementsystem.mapper.BookMapper;
import org.librarymanagementsystem.model.Book;
import org.librarymanagementsystem.repository.BookRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    // CREATE BOOK
    public BookResponseDTO addBook(BookRequestDTO dto) {

        Book book = BookMapper.toEntity(dto);

        book.setAvailableCopies(book.getTotalCopies());
        book.setStatus(BookStatusConstants.AVAILABLE);

        // NEW FIELD
        book.setCoverImage(dto.getCoverImage());

        return BookMapper.toDTO(bookRepository.save(book));
    }

    // GET BOOK BY ID
    public BookResponseDTO getBookById(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        return BookMapper.toDTO(book);
    }

    // GET ALL BOOKS
    public PaginatedResponseDTO<BookResponseDTO> getAllBooks(
            int page,
            int size,
            String sortBy,
            String direction) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                direction.equalsIgnoreCase("asc")
                        ? Sort.by(sortBy).ascending()
                        : Sort.by(sortBy).descending()
        );

        Page<Book> pageResult = bookRepository.findAll(pageable);

        List<BookResponseDTO> content = pageResult.getContent()
                .stream()
                .map(BookMapper::toDTO)
                .toList();

        return buildPaginatedResponse(pageResult, content);
    }

    // SEARCH BOOKS
    public PaginatedResponseDTO<BookResponseDTO> searchBooks(
            String title,
            String author,
            String genre,
            String status,
            int page,
            int size,
            String sortBy,
            String direction) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                direction.equalsIgnoreCase("asc")
                        ? Sort.by(sortBy).ascending()
                        : Sort.by(sortBy).descending()
        );

        Page<Book> pageResult =
                bookRepository.searchBooks(title, author, genre, status, pageable);

        List<BookResponseDTO> content = pageResult.getContent()
                .stream()
                .map(BookMapper::toDTO)
                .toList();

        return buildPaginatedResponse(pageResult, content);
    }

    // UPDATE BOOK
    public BookResponseDTO updateBook(Long id, BookRequestDTO dto) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setPublisher(dto.getPublisher());
        book.setMrp(dto.getMrp());
        book.setTotalCopies(dto.getTotalCopies());
        book.setIsbn(dto.getIsbn());

        // NEW FIELD
        book.setCoverImage(dto.getCoverImage());

        return BookMapper.toDTO(bookRepository.save(book));
    }

    // DELETE BOOK
    public void deleteBook(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (book.getAvailableCopies() < book.getTotalCopies()) {
            throw new RuntimeException("Cannot delete issued book");
        }

        bookRepository.delete(book);
    }

    // UPDATE STATUS
    public BookResponseDTO updateAvailability(Long id, String status) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        book.setStatus(status);

        return BookMapper.toDTO(bookRepository.save(book));
    }

    // PAGINATION BUILDER
    private PaginatedResponseDTO<BookResponseDTO> buildPaginatedResponse(
            Page<Book> pageResult,
            List<BookResponseDTO> content) {

        return new PaginatedResponseDTO<>(
                content,
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements(),
                pageResult.getTotalPages(),
                pageResult.isLast()
        );
    }
}