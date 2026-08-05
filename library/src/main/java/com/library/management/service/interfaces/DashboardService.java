package com.library.management.service.interfaces;
import com.library.management.dto.response.FineHistoryResponse;
import com.library.management.dto.response.DueSoonBookResponse;
import com.library.management.dto.response.DashboardResponse;
import com.library.management.dto.response.BorrowedBookDetailResponse;
import java.util.List;
import com.library.management.dto.response.MostBorrowedBookResponse;
import com.library.management.dto.response.TopActiveStudentResponse;
import com.library.management.dto.response.MonthlyBorrowStatisticsResponse;
import com.library.management.dto.response.NeverBorrowedBookResponse;
import com.library.management.dto.response.StudentDashboardResponse;
import com.library.management.dto.response.ReportResponse;
import com.library.management.dto.response.BorrowedBookResponse;

public interface DashboardService {
    StudentDashboardResponse getStudentDashboard(Long userId);
    DashboardResponse getDashboardSummary();
    List<MostBorrowedBookResponse> getMostBorrowedBooks();
    List<TopActiveStudentResponse> getTopActiveStudents();
    List<MonthlyBorrowStatisticsResponse> getMonthlyBorrowStatistics();
    List<NeverBorrowedBookResponse> getNeverBorrowedBooks();
    List<ReportResponse> getReport();
    List<BorrowedBookResponse> getBorrowedBooks(Long userId);
    List<DueSoonBookResponse> getDueSoonBooks(Long userId);
    BorrowedBookDetailResponse getBorrowedBookDetails(Long issueId);
    List<BorrowedBookResponse> getBorrowHistory(Long userId);
    List<FineHistoryResponse> getFineHistory(Long userId);
}