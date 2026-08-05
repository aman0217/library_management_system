package com.library.management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardResponse {

    private Long borrowedBooks;

    private Long returnedBooks;

    private Double pendingFine;

    private Long unreadNotifications;

}