package com.library.management.controller;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.IssueResponse;
import com.library.management.service.interfaces.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
public class BorrowController {

    private final IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueResponse> borrowBook(
            @RequestBody IssueBookRequest request) {

        return ResponseEntity.ok(
                issueService.issueBook(request)
        );
    }

    @PutMapping("/return/{issueId}")
    public ResponseEntity<IssueResponse> returnBook(
            @PathVariable Long issueId) {

        return ResponseEntity.ok(
                issueService.returnBook(issueId)
        );
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<IssueResponse>> history(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                issueService.getBorrowHistory(userId)
        );
    }

    @GetMapping("/current/{userId}")
    public ResponseEntity<List<IssueResponse>> currentBooks(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                issueService.getCurrentBorrowedBooks(userId)
        );
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<IssueResponse>> overdueBooks() {

        return ResponseEntity.ok(
                issueService.getOverdueBooks()
        );
    }
}