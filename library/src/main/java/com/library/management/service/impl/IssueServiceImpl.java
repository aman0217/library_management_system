package com.library.management.service.impl;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.IssueResponse;
import com.library.management.entity.Book;
import com.library.management.entity.IssueRecord;
import com.library.management.entity.User;
import com.library.management.exception.BadRequestException;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.BookRepository;
import com.library.management.repository.IssueRecordRepository;
import com.library.management.repository.UserRepository;
import com.library.management.service.interfaces.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import com.library.management.service.interfaces.NotificationService;
import com.library.management.email.EmailService;
import java.util.List;


@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRecordRepository issueRecordRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;

    @Override
    public IssueResponse issueBook(IssueBookRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Prevent duplicate issue of same book to same student
        if (issueRecordRepository.existsByUserIdAndBookIdAndReturnedFalse(
                request.getUserId(),
                request.getBookId())) {

            throw new BadRequestException(
                    "This book is already issued to this student."
            );
        }

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        if (!book.getActive()) {
            throw new BadRequestException("Book is inactive");
        }

        if (book.getAvailableCopies() <= 0) {
            throw new BadRequestException("Book is not available");
        }

        IssueRecord issueRecord = IssueRecord.builder()
                .user(user)
                .book(book)
                .issueDate(java.time.LocalDate.now())
                .dueDate(java.time.LocalDate.now().plusDays(15))
                .returned(false)
                .build();

        book.setAvailableCopies(book.getAvailableCopies() - 1);

        bookRepository.save(book);

        IssueRecord savedIssue = issueRecordRepository.save(issueRecord);
        // Student Notification
        notificationService.notifyStudent(
                user.getId(),
                "Book Borrowed",
                "You have successfully borrowed \"" + book.getTitle() + "\".",
                "SUCCESS"
        );

// Admin Notification
        notificationService.notifyAdmins(
                "Book Borrowed",
                user.getFirstName() + " " + user.getLastName()
                        + " borrowed \"" + book.getTitle() + "\".",
                "INFO"
        );

// Student Email
        emailService.sendBorrowEmail(
                user.getEmail(),
                user.getFirstName(),
                book.getTitle(),
                savedIssue.getDueDate().toString()
        );

        return IssueResponse.builder()
                .issueId(savedIssue.getId())
                .studentName(user.getFirstName() + " " + user.getLastName())
                .bookTitle(book.getTitle())
                .issueDate(savedIssue.getIssueDate())
                .dueDate(savedIssue.getDueDate())
                .returned(savedIssue.getReturned())
                .build();
    }
    @Override
    public IssueResponse returnBook(Long issueId) {

        IssueRecord issueRecord = issueRecordRepository.findById(issueId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Issue record not found"));

        if (issueRecord.getReturned()) {
            throw new BadRequestException("Book already returned");
        }

        // Return date
        java.time.LocalDate returnDate = java.time.LocalDate.now();

        issueRecord.setReturned(true);
        issueRecord.setReturnDate(returnDate);

        Book book = issueRecord.getBook();

        // Increase available copies
        book.setAvailableCopies(book.getAvailableCopies() + 1);

        bookRepository.save(book);

        IssueRecord updatedIssue = issueRecordRepository.save(issueRecord);

        // Fine calculation
        long lateDays = 0;
        double fineAmount = 0.0;

        if (returnDate.isAfter(updatedIssue.getDueDate())) {

            lateDays = java.time.temporal.ChronoUnit.DAYS.between(
                    updatedIssue.getDueDate(),
                    returnDate
            );

            fineAmount = lateDays * 10.0; // ₹10 per day
        }

        User user = updatedIssue.getUser();
        // Student Notification
        notificationService.notifyStudent(
                user.getId(),
                "Book Returned",
                "You have successfully returned \"" + book.getTitle() + "\".",
                "SUCCESS"
        );

// Admin Notification
        notificationService.notifyAdmins(
                "Book Returned",
                user.getFirstName() + " " + user.getLastName()
                        + " returned \"" + book.getTitle() + "\".",
                "INFO"
        );

// Student Email
        emailService.sendReturnEmail(
                user.getEmail(),
                user.getFirstName(),
                book.getTitle()
        );

        return IssueResponse.builder()
                .issueId(updatedIssue.getId())
                .studentName(user.getFirstName() + " " + user.getLastName())
                .bookTitle(book.getTitle())
                .issueDate(updatedIssue.getIssueDate())
                .dueDate(updatedIssue.getDueDate())
                .returnDate(returnDate)
                .lateDays(lateDays)
                .fineAmount(fineAmount)
                .returned(updatedIssue.getReturned())
                .build();
    }
    @Override
    public List<IssueResponse> getBorrowHistory(Long userId) {

        List<IssueRecord> issueRecords =
                issueRecordRepository.findByUserIdOrderByIssueDateDesc(userId);

        return issueRecords.stream()
                .map(issue -> {

                    long lateDays = 0;
                    double fineAmount = 0;

                    if (issue.getReturnDate() != null &&
                            issue.getReturnDate().isAfter(issue.getDueDate())) {

                        lateDays = java.time.temporal.ChronoUnit.DAYS.between(
                                issue.getDueDate(),
                                issue.getReturnDate());

                        fineAmount = lateDays * 10;
                    }

                    return IssueResponse.builder()
                            .issueId(issue.getId())
                            .studentName(
                                    issue.getUser().getFirstName() + " "
                                            + issue.getUser().getLastName())
                            .bookTitle(issue.getBook().getTitle())
                            .author(issue.getBook().getAuthor())

                            .category(issue.getBook().getCategory())

                            .status(
                                    issue.getReturned()
                                            ? "RETURNED"
                                            : "BORROWED"
                            )
                            .issueDate(issue.getIssueDate())
                            .dueDate(issue.getDueDate())
                            .returnDate(issue.getReturnDate())
                            .lateDays(lateDays)
                            .fineAmount(fineAmount)
                            .returned(issue.getReturned())
                            .build();

                })
                .toList();
    }
    @Override
    public List<IssueResponse> getCurrentBorrowedBooks(Long userId) {

        List<IssueRecord> issueRecords =
                issueRecordRepository.findByUserIdAndReturnedFalseOrderByIssueDateDesc(userId);

        return issueRecords.stream()
                .map(issue -> IssueResponse.builder()
                        .issueId(issue.getId())
                        .studentName(
                                issue.getUser().getFirstName() + " "
                                        + issue.getUser().getLastName())
                        .bookTitle(issue.getBook().getTitle())
                        .issueDate(issue.getIssueDate())
                        .dueDate(issue.getDueDate())
                        .returnDate(null)
                        .lateDays(0L)
                        .fineAmount(0.0)
                        .returned(false)
                        .build())
                .toList();
    }
    @Override
    public List<IssueResponse> getOverdueBooks() {

        List<IssueRecord> issueRecords =
                issueRecordRepository.findByReturnedFalseAndDueDateBefore(LocalDate.now());

        return issueRecords.stream()
                .map(issue -> {

                    long lateDays = ChronoUnit.DAYS.between(
                            issue.getDueDate(),
                            LocalDate.now());

                    double fineAmount = lateDays * 10;

                    return IssueResponse.builder()
                            .issueId(issue.getId())
                            .studentName(
                                    issue.getUser().getFirstName() + " "
                                            + issue.getUser().getLastName())
                            .bookTitle(issue.getBook().getTitle())
                            .issueDate(issue.getIssueDate())
                            .dueDate(issue.getDueDate())
                            .returnDate(null)
                            .lateDays(lateDays)
                            .fineAmount(fineAmount)
                            .returned(false)
                            .build();

                })
                .toList();
    }
}