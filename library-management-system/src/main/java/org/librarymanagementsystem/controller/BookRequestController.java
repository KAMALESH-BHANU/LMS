//package org.librarymanagementsystem.controller;
//
//import org.librarymanagementsystem.dto.BookRequest.BookRequestDTO;
//import org.librarymanagementsystem.model.BookRequest;
//import org.librarymanagementsystem.service.BookRequestService;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/book-requests")
//public class BookRequestController {
//
//    private final BookRequestService bookRequestService;
//
//    public BookRequestController(BookRequestService bookRequestService) {
//        this.bookRequestService = bookRequestService;
//    }
//
//    // Student requests book
//    @PostMapping("/{bookId}")
//    public BookRequest requestBook(@PathVariable Long bookId,
//                                   Authentication authentication) {
//
//        String email = authentication.getName(); // from JWT
//
//        return bookRequestService.requestBook(bookId, email);
//    }
//
//    // Admin view requests
//    @GetMapping
//    public List<BookRequestDTO> getAllRequests() {
//        return bookRequestService.getAllRequests();
//    }
//
//    // Approve/Reject
//    @PatchMapping("/{id}")
//    public BookRequestDTO updateStatus(@PathVariable Long id,
//                                    @RequestParam String status) {
//        return bookRequestService.updateStatus(id, status);
//    }
//}
package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.dto.BookRequest.BookRequestDTO;
import org.librarymanagementsystem.model.BookRequest;
import org.librarymanagementsystem.service.BookRequestService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/book-requests")
public class BookRequestController {

    private final BookRequestService bookRequestService;

    public BookRequestController(BookRequestService bookRequestService) {
        this.bookRequestService = bookRequestService;
    }

    @PostMapping("/{bookId}")
    public BookRequest requestBook(@PathVariable Long bookId,
                                   Authentication authentication) {

        String email = authentication.getName();

        return bookRequestService.requestBook(bookId, email);
    }



    @PatchMapping("/{id}")
    public BookRequestDTO updateStatus(@PathVariable Long id,
                                       @RequestParam String status) {

        return bookRequestService.updateStatus(id, status);
    }
    @GetMapping
    public Page<BookRequestDTO> getAllRequests(
            @RequestParam(defaultValue = "PENDING") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {

        return bookRequestService.getRequestsByStatus(
                status,
                PageRequest.of(page, size)
        );
    }
}