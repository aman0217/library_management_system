package com.library.management.dto.response;

import com.library.management.enums.BorrowStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowBookResponse {

    private Long borrowId;

    private String studentName;

    private String bookTitle;

    private LocalDate borrowDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private BorrowStatus status;

    private Double fine;
}