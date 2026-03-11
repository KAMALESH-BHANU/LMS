//package org.librarymanagementsystem.mapper;
//
//import org.librarymanagementsystem.dto.BookRequestDTO;
//import org.librarymanagementsystem.dto.BookResponseDTO;
//import org.librarymanagementsystem.model.Book;
//
//public class BookMapper {
//
//    public static Book toEntity(BookRequestDTO dto) {
//        Book book = new Book();
//        book.setTitle(dto.getTitle());
//        book.setAuthor(dto.getAuthor());
//        book.setGenre(dto.getGenre());
//        book.setPublisher(dto.getPublisher());
//        book.setMrp(dto.getMrp());
//        book.setTotalCopies(dto.getTotalCopies());
//        book.setIsbn(dto.getIsbn());
//        book.setCoverImage(dto.getCoverImage());
//        return book;
//    }
//
//    public static BookResponseDTO toDTO(Book book) {
//        BookResponseDTO dto = new BookResponseDTO();
//        dto.setId(book.getId());
//        dto.setTitle(book.getTitle());
//        dto.setAuthor(book.getAuthor());
//        dto.setGenre(book.getGenre());
//        dto.setPublisher(book.getPublisher());
//        dto.setMrp(book.getMrp());
//        dto.setTotalCopies(book.getTotalCopies());
//        dto.setAvailableCopies(book.getAvailableCopies());
//        dto.setStatus(book.getStatus());
//        dto.setCoverImage(book.getCoverImage());
//        return dto;
//    }
//}
package org.librarymanagementsystem.mapper;

import org.librarymanagementsystem.dto.BookRequestDTO;
import org.librarymanagementsystem.dto.BookResponseDTO;
import org.librarymanagementsystem.model.Book;

public class BookMapper {

    public static Book toEntity(BookRequestDTO dto) {

        Book book = new Book();

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setPublisher(dto.getPublisher());
        book.setMrp(dto.getMrp());
        book.setTotalCopies(dto.getTotalCopies());
        book.setIsbn(dto.getIsbn());
        book.setCoverImage(dto.getCoverImage());

        return book;
    }

    public static BookResponseDTO toDTO(Book book) {

        BookResponseDTO dto = new BookResponseDTO();

        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre());
        dto.setPublisher(book.getPublisher());
        dto.setMrp(book.getMrp());
        dto.setTotalCopies(book.getTotalCopies());
        dto.setAvailableCopies(book.getAvailableCopies());
        dto.setStatus(book.getStatus());
        dto.setCoverImage(book.getCoverImage());
        dto.setIsbn(book.getIsbn());

        return dto;
    }
}