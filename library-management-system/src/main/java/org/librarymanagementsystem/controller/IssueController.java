//package org.librarymanagementsystem.controller;
//
//import org.librarymanagementsystem.model.Issue;
//import org.librarymanagementsystem.service.IssueService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class IssueController {
//
//    private final IssueService issueService;
//
//    public IssueController(IssueService issueService) {
//        this.issueService = issueService;
//    }
//
//    // POST /api/issues
//    @PostMapping("/issues")
//    public Issue issueBook(@RequestParam Long bookId,
//                           @RequestParam Long memberId) {
//        return issueService.issueBook(bookId, memberId);
//    }
//
//    // GET /api/issues
//    @GetMapping("/issues")
//    public List<Issue> getIssuedBooks(
//            @RequestParam(required = false) String status,
//            @RequestParam(required = false) Long memberId) {
//
//        return issueService.getIssues(status, memberId);
//    }
//
//    // POST /api/returns
//    @PostMapping("/returns")
//    public Issue returnBook(@RequestParam Long issueId,
//                            @RequestParam(required = false) String returnType) {
//        return issueService.returnBook(issueId, returnType);
//    }
//}
package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.dto.IssueResponseDTO;
import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.service.IssueService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // GET ISSUED BOOKS
    @GetMapping("/issues")
    public List<Issue> getIssuedBooks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long memberId
    ) {
        return issueService.getIssues(status, memberId);
    }

    // CHECK ISSUE STATUS
    @GetMapping("/issues/status")
    public Issue getIssueStatus(
            @RequestParam Long bookId,
            @RequestParam Long memberId
    ) {
        return issueService.getIssueStatus(bookId, memberId);
    }

    // ISSUE BOOK
    @PostMapping("/issues")
    public Issue issueBook(
            @RequestParam Long bookId,
            @RequestParam Long memberId,
            @RequestParam String issueDate,
            @RequestParam String dueDate
    ) {

        LocalDate issueLocalDate = LocalDate.parse(issueDate);
        LocalDate dueLocalDate = LocalDate.parse(dueDate);

        return issueService.issueBook(
                bookId,
                memberId,
                issueLocalDate,
                dueLocalDate
        );
    }

    // RETURN BOOK
    @PostMapping("/returns")
    public Issue returnBook(
            @RequestParam Long issueId,
            @RequestParam(required = false) String returnType
    ) {
        return issueService.returnBook(issueId, returnType);
    }
    @GetMapping("/borrow/my-books")
    public List<IssueResponseDTO> getMyBooks(Authentication authentication) {
        return issueService.getMyBooks(authentication.getName());
    }
    @GetMapping("/issues/history")
    public Page<IssueResponseDTO> getBookHistory(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String keyword
    ) {

        String email = authentication.getName();

        return issueService.getBookHistory(email, keyword, page, size);
    }

}