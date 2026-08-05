package com.library.management.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FineHistoryResponse {

    private Long issueId;

    private String bookTitle;

    private String author;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private Long lateDays;

    private Double fineAmount;

    private String status;

}