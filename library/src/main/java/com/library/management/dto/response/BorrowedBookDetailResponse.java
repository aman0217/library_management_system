package com.library.management.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BorrowedBookDetailResponse {

    private Long issueId;

    private String title;

    private String author;

    private String category;

    private String isbn;

    private String publisher;

    private LocalDate issueDate;

    private Integer publicationYear;

    private Integer totalCopies;

    private Integer availableCopies;

    private String coverImage;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private long remainingDays;

    private String status;

    private Double fine;

}