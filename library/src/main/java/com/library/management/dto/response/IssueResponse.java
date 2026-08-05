package com.library.management.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class IssueResponse {

    private Long issueId;

    private String studentName;

    private String bookTitle;

    private LocalDate issueDate;

    private LocalDate dueDate;

    // NEW
    private LocalDate returnDate;

    // NEW
    private Long lateDays;

    // NEW
    private Double fineAmount;

    private boolean returned;
    private String author;

    private String category;

    private String status;
}