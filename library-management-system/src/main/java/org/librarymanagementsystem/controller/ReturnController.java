package org.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.dto.ReturnRequestDTO;
import org.librarymanagementsystem.service.ReturnService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReturnController {

    private final ReturnService returnService;

    // STUDENT REQUEST

    @PostMapping("/returns/request")
    public String requestReturn(@RequestParam Long issueId) {

        returnService.requestReturn(issueId);

        return "Return request submitted";
    }

    // ADMIN VIEW REQUESTS

    @GetMapping("/admin/return-requests")
    public List<ReturnRequestDTO> getReturnRequests() {

        return returnService.getReturnRequests();

    }

    // ADMIN APPROVE RETURN

    @PostMapping("/admin/approve-return")
    public String approveReturn(@RequestParam Long issueId) {

        returnService.approveReturn(issueId);

        return "Return approved";

    }

}