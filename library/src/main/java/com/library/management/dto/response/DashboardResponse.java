package com.library.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalUsers;

    private Long totalBooks;

    private Long availableBooks;

    private Long borrowedBooks;

    private Long activeBorrowings;

    private Long overdueBooks;

    private Double totalFineCollected;

}