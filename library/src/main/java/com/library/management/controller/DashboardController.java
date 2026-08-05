package com.library.management.controller;
import com.library.management.dto.response.FineHistoryResponse;
import com.library.management.dto.response.DueSoonBookResponse;
import com.library.management.dto.response.BorrowedBookResponse;
import com.library.management.dto.response.BorrowedBookDetailResponse;
import com.library.management.dto.response.DashboardResponse;
import com.library.management.dto.response.MonthlyBorrowStatisticsResponse;
import com.library.management.dto.response.MostBorrowedBookResponse;
import com.library.management.dto.response.NeverBorrowedBookResponse;
import com.library.management.dto.response.StudentDashboardResponse;
import com.library.management.dto.response.TopActiveStudentResponse;
import com.library.management.service.interfaces.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.library.management.dto.response.ReportResponse;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardSummary() {

        return ResponseEntity.ok(
                dashboardService.getDashboardSummary()
        );

    }

    @GetMapping("/student/{userId}")
    public ResponseEntity<StudentDashboardResponse> getStudentDashboard(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                dashboardService.getStudentDashboard(userId)
        );

    }
    @GetMapping("/student/{userId}/borrowed-books")
    public ResponseEntity<List<BorrowedBookResponse>> getBorrowedBooks(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                dashboardService.getBorrowedBooks(userId)
        );

    }
    @GetMapping("/student/{userId}/due-soon")
    public ResponseEntity<List<DueSoonBookResponse>> getDueSoonBooks(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                dashboardService.getDueSoonBooks(userId)
        );

    }
    @GetMapping("/borrowed-book/{issueId}")
    public ResponseEntity<BorrowedBookDetailResponse> getBorrowedBookDetails(

            @PathVariable Long issueId) {

        return ResponseEntity.ok(

                dashboardService.getBorrowedBookDetails(issueId)

        );

    }
    @GetMapping("/student/{userId}/history")
    public ResponseEntity<List<BorrowedBookResponse>> getBorrowHistory(

            @PathVariable Long userId) {

        return ResponseEntity.ok(

                dashboardService.getBorrowHistory(userId)

        );

    }
    @GetMapping("/student/{userId}/fine-history")
    public ResponseEntity<List<FineHistoryResponse>> getFineHistory(

            @PathVariable Long userId) {

        return ResponseEntity.ok(

                dashboardService.getFineHistory(userId)

        );

    }
    @GetMapping("/most-borrowed-books")
    public ResponseEntity<List<MostBorrowedBookResponse>> getMostBorrowedBooks() {

        return ResponseEntity.ok(
                dashboardService.getMostBorrowedBooks()
        );

    }

    @GetMapping("/top-active-students")
    public ResponseEntity<List<TopActiveStudentResponse>> getTopActiveStudents() {

        return ResponseEntity.ok(
                dashboardService.getTopActiveStudents()
        );

    }

    @GetMapping("/monthly-borrow-statistics")
    public ResponseEntity<List<MonthlyBorrowStatisticsResponse>> getMonthlyBorrowStatistics() {

        return ResponseEntity.ok(
                dashboardService.getMonthlyBorrowStatistics()
        );

    }

    @GetMapping("/never-borrowed-books")
    public ResponseEntity<List<NeverBorrowedBookResponse>> getNeverBorrowedBooks() {

        return ResponseEntity.ok(
                dashboardService.getNeverBorrowedBooks()
        );

    }
    @GetMapping("/reports")
    public ResponseEntity<List<ReportResponse>> getReports(){

        return ResponseEntity.ok(
                dashboardService.getReport()
        );

    }
}