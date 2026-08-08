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
import com.library.management.service.interfaces.NotificationService;
import com.library.management.email.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRecordRepository issueRecordRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;


    // =========================================================
    // ISSUE BOOK
    // =========================================================

    @Override
    @Transactional
    public IssueResponse issueBook(IssueBookRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );


        // Prevent duplicate active issue
        if (issueRecordRepository.existsByUserIdAndBookIdAndReturnedFalse(
                request.getUserId(),
                request.getBookId()
        )) {

            throw new BadRequestException(
                    "This book is already issued to this student."
            );
        }


        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found")
                );


        if (!book.getActive()) {

            throw new BadRequestException(
                    "Book is inactive"
            );
        }


        if (book.getAvailableCopies() <= 0) {

            throw new BadRequestException(
                    "Book is not available"
            );
        }


        LocalDate issueDate = LocalDate.now();

        LocalDate dueDate = issueDate.plusDays(15);


        IssueRecord issueRecord = IssueRecord.builder()
                .user(user)
                .book(book)
                .issueDate(issueDate)
                .dueDate(dueDate)
                .returned(false)
                .build();


        // Reduce available copies
        book.setAvailableCopies(
                book.getAvailableCopies() - 1
        );

        bookRepository.save(book);


        IssueRecord savedIssue =
                issueRecordRepository.save(issueRecord);


        // =====================================================
        // STUDENT NOTIFICATION
        // =====================================================

        notificationService.notifyStudent(
                user.getId(),
                "Book Borrowed",
                "You have successfully borrowed \""
                        + book.getTitle()
                        + "\".",
                "SUCCESS"
        );


        // =====================================================
        // ADMIN NOTIFICATION
        // =====================================================

        notificationService.notifyAdmins(
                "Book Borrowed",
                user.getFirstName()
                        + " "
                        + user.getLastName()
                        + " borrowed \""
                        + book.getTitle()
                        + "\".",
                "INFO"
        );


        // =====================================================
        // EMAIL
        // =====================================================

        emailService.sendBorrowEmail(
                user.getEmail(),
                user.getFirstName(),
                book.getTitle(),
                savedIssue.getDueDate().toString()
        );


        return IssueResponse.builder()
                .issueId(savedIssue.getId())
                .studentName(
                        user.getFirstName()
                                + " "
                                + user.getLastName()
                )
                .bookTitle(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .issueDate(savedIssue.getIssueDate())
                .dueDate(savedIssue.getDueDate())
                .returned(savedIssue.getReturned())
                .status("BORROWED")
                .build();
    }


    // =========================================================
    // RETURN BOOK
    // =========================================================

    @Override
    @Transactional
    public IssueResponse returnBook(Long issueId) {

        IssueRecord issueRecord =
                issueRecordRepository.findById(issueId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Issue record not found"
                                )
                        );


        if (issueRecord.getReturned()) {

            throw new BadRequestException(
                    "Book already returned"
            );
        }


        User user = issueRecord.getUser();

        Book book = issueRecord.getBook();


        LocalDate returnDate = LocalDate.now();


        issueRecord.setReturned(true);

        issueRecord.setReturnDate(returnDate);


        // Increase available copies
        book.setAvailableCopies(
                book.getAvailableCopies() + 1
        );

        bookRepository.save(book);


        IssueRecord updatedIssue =
                issueRecordRepository.save(issueRecord);


        // =====================================================
        // FINE
        // =====================================================

        long lateDays = 0;

        double fineAmount = 0.0;


        if (returnDate.isAfter(
                updatedIssue.getDueDate()
        )) {

            lateDays = ChronoUnit.DAYS.between(
                    updatedIssue.getDueDate(),
                    returnDate
            );

            fineAmount = lateDays * 10.0;
        }


        // =====================================================
        // STUDENT NOTIFICATION
        // =====================================================

        notificationService.notifyStudent(
                user.getId(),
                "Book Returned",
                "You have successfully returned \""
                        + book.getTitle()
                        + "\".",
                "SUCCESS"
        );


        // =====================================================
        // ADMIN NOTIFICATION
        // =====================================================

        notificationService.notifyAdmins(
                "Book Returned",
                user.getFirstName()
                        + " "
                        + user.getLastName()
                        + " returned \""
                        + book.getTitle()
                        + "\".",
                "INFO"
        );


        // =====================================================
        // EMAIL
        // =====================================================

        emailService.sendReturnEmail(
                user.getEmail(),
                user.getFirstName(),
                book.getTitle()
        );


        return IssueResponse.builder()
                .issueId(updatedIssue.getId())
                .studentName(
                        user.getFirstName()
                                + " "
                                + user.getLastName()
                )
                .bookTitle(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .issueDate(updatedIssue.getIssueDate())
                .dueDate(updatedIssue.getDueDate())
                .returnDate(returnDate)
                .lateDays(lateDays)
                .fineAmount(fineAmount)
                .returned(true)
                .status("RETURNED")
                .build();
    }


    // =========================================================
    // BORROW HISTORY
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<IssueResponse> getBorrowHistory(Long userId) {

        List<IssueRecord> records =
                issueRecordRepository
                        .findByUserIdOrderByIssueDateDesc(userId);


        return records.stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // CURRENT BORROWED BOOKS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<IssueResponse> getCurrentBorrowedBooks(
            Long userId
    ) {

        List<IssueRecord> records =
                issueRecordRepository
                        .findByUserIdAndReturnedFalseOrderByIssueDateDesc(
                                userId
                        );


        return records.stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // OVERDUE BOOKS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<IssueResponse> getOverdueBooks() {

        List<IssueRecord> records =
                issueRecordRepository
                        .findByReturnedFalseAndDueDateBefore(
                                LocalDate.now()
                        );


        return records.stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================================
    // COMMON RESPONSE CONVERTER
    // =========================================================

    private IssueResponse convertToResponse(
            IssueRecord issue
    ) {

        long lateDays = 0;

        double fineAmount = 0.0;


        if (issue.getReturnDate() != null
                && issue.getReturnDate()
                .isAfter(issue.getDueDate())) {

            lateDays = ChronoUnit.DAYS.between(
                    issue.getDueDate(),
                    issue.getReturnDate()
            );

            fineAmount = lateDays * 10.0;
        }


        User user = issue.getUser();

        Book book = issue.getBook();


        return IssueResponse.builder()
                .issueId(issue.getId())

                .studentName(
                        user.getFirstName()
                                + " "
                                + user.getLastName()
                )

                .bookTitle(book.getTitle())

                .author(book.getAuthor())

                .category(book.getCategory())

                .status(
                        Boolean.TRUE.equals(issue.getReturned())
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
    }
}