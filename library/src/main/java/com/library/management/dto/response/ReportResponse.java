package com.library.management.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {

    private Long issueId;

    private String studentName;

    private String bookTitle;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private Long lateDays;      // <-- ADD THIS

    private Double fineAmount;

    private boolean returned;

}