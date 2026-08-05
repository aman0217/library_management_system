package com.library.management.controller;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.IssueResponse;
import com.library.management.service.interfaces.IssueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public ResponseEntity<IssueResponse> issueBook(
            @Valid @RequestBody IssueBookRequest request) {

        IssueResponse response = issueService.issueBook(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @PutMapping("/{issueId}/return")
    public ResponseEntity<IssueResponse> returnBook(
            @PathVariable Long issueId) {

        return ResponseEntity.ok(issueService.returnBook(issueId));
    }
    @GetMapping("/student/{userId}")
    public ResponseEntity<List<IssueResponse>> getBorrowHistory(
            @PathVariable Long userId) {

        return ResponseEntity.ok(issueService.getBorrowHistory(userId));
    }
    @GetMapping("/student/{userId}/current")
    public ResponseEntity<List<IssueResponse>> getCurrentBorrowedBooks(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                issueService.getCurrentBorrowedBooks(userId)
        );
    }
    @GetMapping("/overdue")
    public ResponseEntity<List<IssueResponse>> getOverdueBooks() {

        return ResponseEntity.ok(
                issueService.getOverdueBooks()
        );
    }
}