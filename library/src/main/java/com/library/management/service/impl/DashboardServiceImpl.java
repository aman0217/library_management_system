package com.library.management.service.impl;
import com.library.management.dto.response.FineHistoryResponse;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.library.management.entity.Book;
import com.library.management.dto.response.DueSoonBookResponse;
import com.library.management.dto.response.BorrowedBookDetailResponse;
import com.library.management.dto.response.BorrowedBookResponse;
import com.library.management.dto.response.DashboardResponse;
import com.library.management.entity.IssueRecord;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssueRecordRepository;
import com.library.management.repository.UserRepository;
import com.library.management.service.interfaces.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.library.management.dto.response.MostBorrowedBookResponse;
import com.library.management.dto.response.ReportResponse;

import com.library.management.repository.projection.MostBorrowedBookProjection;
import com.library.management.repository.NotificationRepository;
import java.util.List;
import com.library.management.dto.response.TopActiveStudentResponse;
import com.library.management.dto.response.MonthlyBorrowStatisticsResponse;
import com.library.management.dto.response.NeverBorrowedBookResponse;
import com.library.management.dto.response.StudentDashboardResponse;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final IssueRecordRepository issueRecordRepository;
    private final NotificationRepository notificationRepository;


    @Override
    public DashboardResponse getDashboardSummary() {

        long totalUsers = userRepository.count();

        long totalBooks = bookRepository.countByActiveTrue();

        long availableBooks = bookRepository.findAll()
                .stream()
                .mapToLong(Book::getAvailableCopies)
                .sum();

        long borrowedBooks = issueRecordRepository.countByReturnedFalse();


        long activeBorrowings =
                issueRecordRepository.countByReturnedFalse();

        long overdueBooks =
                issueRecordRepository.countByReturnedFalseAndDueDateBefore(
                        LocalDate.now());

        double totalFineCollected = issueRecordRepository.findAll()
                .stream()
                .filter(IssueRecord::getReturned)
                .filter(issue ->
                        issue.getReturnDate() != null &&
                                issue.getReturnDate().isAfter(issue.getDueDate()))
                .mapToDouble(issue -> {

                    long lateDays = ChronoUnit.DAYS.between(
                            issue.getDueDate(),
                            issue.getReturnDate());

                    return lateDays * 10.0;

                })
                .sum();

        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalBooks(totalBooks)
                .availableBooks(availableBooks)
                .borrowedBooks(borrowedBooks)
                .activeBorrowings(activeBorrowings)
                .overdueBooks(overdueBooks)
                .totalFineCollected(totalFineCollected)
                .build();
    }
    @Override
    public List<MostBorrowedBookResponse> getMostBorrowedBooks() {

        return issueRecordRepository.getMostBorrowedBooks()
                .stream()
                .map(book -> MostBorrowedBookResponse.builder()
                        .bookId(book.getBookId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .borrowCount(book.getBorrowCount())
                        .build())
                .toList();
    }
    @Override
    public List<TopActiveStudentResponse> getTopActiveStudents() {

        return issueRecordRepository.getTopActiveStudents()
                .stream()
                .map(student -> TopActiveStudentResponse.builder()
                        .userId(student.getUserId())
                        .studentName(
                                student.getFirstName() + " " + student.getLastName()
                        )
                        .borrowCount(student.getBorrowCount())
                        .build())
                .toList();
    }
    @Override
    public List<MonthlyBorrowStatisticsResponse> getMonthlyBorrowStatistics() {

        return issueRecordRepository.getMonthlyBorrowStatistics()
                .stream()
                .map(stat -> MonthlyBorrowStatisticsResponse.builder()
                        .year(stat.getYear())
                        .month(stat.getMonth())
                        .borrowCount(stat.getBorrowCount())
                        .build())
                .toList();
    }
    @Override
    public List<NeverBorrowedBookResponse> getNeverBorrowedBooks() {

        return bookRepository.getNeverBorrowedBooks()
                .stream()
                .map(book -> NeverBorrowedBookResponse.builder()
                        .bookId(book.getBookId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .category(book.getCategory())
                        .build())
                .toList();
    }
    @Override
    public StudentDashboardResponse getStudentDashboard(Long userId) {

        long borrowedBooks =
                issueRecordRepository
                        .findByUserIdAndReturnedFalseOrderByIssueDateDesc(userId)
                        .size();

        long returnedBooks =
                issueRecordRepository
                        .findByUserIdOrderByIssueDateDesc(userId)
                        .stream()
                        .filter(IssueRecord::getReturned)
                        .count();

        double pendingFine =
                issueRecordRepository
                        .findByUserIdAndReturnedFalseOrderByIssueDateDesc(userId)
                        .stream()
                        .filter(issue -> issue.getDueDate().isBefore(LocalDate.now()))
                        .mapToDouble(issue -> {

                            long lateDays = ChronoUnit.DAYS.between(
                                    issue.getDueDate(),
                                    LocalDate.now());

                            return lateDays * 10.0;

                        })
                        .sum();

        long unreadNotifications =
                notificationRepository.countByUserIdAndReadFalse(userId);

        return StudentDashboardResponse.builder()
                .borrowedBooks(borrowedBooks)
                .returnedBooks(returnedBooks)
                .pendingFine(pendingFine)
                .unreadNotifications(unreadNotifications)
                .build();
    }
    @Override
    public List<DueSoonBookResponse> getDueSoonBooks(Long userId) {

        LocalDate today = LocalDate.now();

        LocalDate nextThreeDays = today.plusDays(3);

        return issueRecordRepository
                .findByUserIdAndReturnedFalseAndDueDateBetween(
                        userId,
                        today,
                        nextThreeDays
                )
                .stream()
                .map(issue -> DueSoonBookResponse.builder()

                        .issueId(issue.getId())

                        .title(issue.getBook().getTitle())

                        .author(issue.getBook().getAuthor())

                        .dueDate(issue.getDueDate())

                        .remainingDays(
                                ChronoUnit.DAYS.between(
                                        today,
                                        issue.getDueDate()
                                )
                        )

                        .build())

                .toList();
    }
    @Override
    public List<BorrowedBookResponse> getBorrowedBooks(Long userId) {

        LocalDate today = LocalDate.now();

        return issueRecordRepository
                .findByUserIdAndReturnedFalseOrderByIssueDateDesc(userId)
                .stream()
                .map(issue -> {

                    long remainingDays =
                            ChronoUnit.DAYS.between(
                                    today,
                                    issue.getDueDate()
                            );

                    String status;

                    if (issue.getReturned()) {

                        status = "RETURNED";

                    }

                    else if (remainingDays < 0) {

                        status = "OVERDUE";

                    }

                    else if (remainingDays <= 3) {

                        status = "DUE SOON";

                    }

                    else {

                        status = "ACTIVE";

                    }

                    return BorrowedBookResponse.builder()

                            .issueId(issue.getId())

                            .bookId(issue.getBook().getId())

                            .title(issue.getBook().getTitle())

                            .author(issue.getBook().getAuthor())

                            .category(issue.getBook().getCategory())

                            .issueDate(issue.getIssueDate())

                            .dueDate(issue.getDueDate())

                            .returned(issue.getReturned())

                            .remainingDays(
                                    Math.max(remainingDays, 0)
                            )

                            .status(status)

                            .build();

                })

                .toList();

    }
    @Override
    public BorrowedBookDetailResponse getBorrowedBookDetails(Long issueId) {

        IssueRecord issue = issueRecordRepository
                .findById(issueId)
                .orElseThrow(() ->
                        new RuntimeException("Borrow record not found"));

        LocalDate today = LocalDate.now();

        long remainingDays = issue.getReturned()
                ? 0
                : Math.max(
                ChronoUnit.DAYS.between(
                        today,
                        issue.getDueDate()
                ),
                0
        );

        String status;

        if (issue.getReturned()) {

            status = "RETURNED";

        } else if (issue.getDueDate().isBefore(today)) {

            status = "OVERDUE";

        } else if (remainingDays <= 3) {

            status = "DUE SOON";

        } else {

            status = "ACTIVE";

        }

        double fine = 0;

        if (!issue.getReturned() &&
                issue.getDueDate().isBefore(today)) {

            fine = ChronoUnit.DAYS.between(
                    issue.getDueDate(),
                    today
            ) * 10;

        }

        return BorrowedBookDetailResponse.builder()

                .issueId(issue.getId())

                .title(issue.getBook().getTitle())

                .author(issue.getBook().getAuthor())

                .category(issue.getBook().getCategory())

                .isbn(issue.getBook().getIsbn())

                .publisher(issue.getBook().getPublisher())

                .publicationYear(issue.getBook().getPublicationYear())

                .totalCopies(issue.getBook().getTotalCopies())

                .availableCopies(issue.getBook().getAvailableCopies())

                .coverImage(issue.getBook().getCoverImage())

                .issueDate(issue.getIssueDate())

                .dueDate(issue.getDueDate())

                .returnDate(issue.getReturnDate())

                .remainingDays(remainingDays)

                .status(status)

                .fine(fine)

                .build();

    }
    @Override
    public List<ReportResponse> getReport() {

        return issueRecordRepository.findAll()
                .stream()
                .map(issue -> {

                    long lateDays = 0;
                    double fine = 0;

                    if (issue.getReturnDate() != null &&
                            issue.getReturnDate().isAfter(issue.getDueDate())) {

                        lateDays = ChronoUnit.DAYS.between(
                                issue.getDueDate(),
                                issue.getReturnDate());

                        fine = lateDays * 10;

                    }

                    return ReportResponse.builder()

                            .issueId(issue.getId())

                            .studentName(
                                    issue.getUser().getFirstName()
                                            + " "
                                            + issue.getUser().getLastName())

                            .bookTitle(issue.getBook().getTitle())

                            .issueDate(issue.getIssueDate())

                            .dueDate(issue.getDueDate())

                            .returnDate(issue.getReturnDate())

                            .returned(issue.getReturned())

                            .lateDays(lateDays)

                            .fineAmount(fine)

                            .build();

                })
                .toList();

    }
    @Override
    public List<BorrowedBookResponse> getBorrowHistory(Long userId) {

        LocalDate today = LocalDate.now();

        return issueRecordRepository
                .findByUserIdOrderByIssueDateDesc(userId)
                .stream()
                .map(issue -> {

                    long remainingDays =
                            ChronoUnit.DAYS.between(
                                    today,
                                    issue.getDueDate()
                            );

                    String status;

                    if (Boolean.TRUE.equals(issue.getReturned())) {

                        status = "RETURNED";

                    }

                    else if (remainingDays < 0) {

                        status = "OVERDUE";

                    }

                    else if (remainingDays <= 3) {

                        status = "DUE SOON";

                    }

                    else {

                        status = "ACTIVE";

                    }

                    return BorrowedBookResponse.builder()

                            .issueId(issue.getId())

                            .bookId(issue.getBook().getId())

                            .title(issue.getBook().getTitle())

                            .author(issue.getBook().getAuthor())

                            .category(issue.getBook().getCategory())

                            .issueDate(issue.getIssueDate())

                            .dueDate(issue.getDueDate())

                            .returnDate(issue.getReturnDate())

                            .returned(issue.getReturned())

                            .remainingDays(Math.max(remainingDays, 0))

                            .status(status)

                            .build();

                })

                .toList();

    }
    @Override
    public List<FineHistoryResponse> getFineHistory(Long userId) {

        List<IssueRecord> issueRecords =
                issueRecordRepository.findByUserIdOrderByIssueDateDesc(userId);

        return issueRecords.stream()

                .filter(issue -> {

                    LocalDate returnDate = issue.getReturnDate();

                    return returnDate != null &&
                            returnDate.isAfter(issue.getDueDate());

                })

                .map(issue -> {

                    long lateDays =
                            ChronoUnit.DAYS.between(
                                    issue.getDueDate(),
                                    issue.getReturnDate()
                            );

                    double fineAmount = lateDays * 10.0;

                    return FineHistoryResponse.builder()

                            .issueId(issue.getId())

                            .bookTitle(issue.getBook().getTitle())

                            .author(issue.getBook().getAuthor())

                            .issueDate(issue.getIssueDate())

                            .dueDate(issue.getDueDate())

                            .returnDate(issue.getReturnDate())

                            .lateDays(lateDays)

                            .fineAmount(fineAmount)

                            .status("UNPAID")

                            .build();

                })

                .toList();

    }
}