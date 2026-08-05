package com.library.management.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class DueSoonBookResponse {

    private Long issueId;

    private String title;

    private String author;

    private LocalDate dueDate;

    private long remainingDays;

}