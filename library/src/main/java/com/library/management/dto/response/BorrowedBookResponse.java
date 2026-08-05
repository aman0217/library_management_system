package com.library.management.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BorrowedBookResponse {

    private Long issueId;

    private Long bookId;

    private String title;

    private String author;

    private String category;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private boolean returned;

    private long remainingDays;

    private String status;

    private LocalDate returnDate;

}