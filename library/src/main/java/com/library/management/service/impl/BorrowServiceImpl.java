package com.library.management.service.impl;

import com.library.management.dto.request.BorrowBookRequest;
import com.library.management.dto.response.BorrowBookResponse;
import com.library.management.entity.Book;
import com.library.management.entity.BorrowRecord;
import com.library.management.entity.User;
import com.library.management.enums.BorrowStatus;
import com.library.management.exception.BadRequestException;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.BookRepository;
import com.library.management.repository.BorrowRecordRepository;
import com.library.management.repository.UserRepository;
import com.library.management.service.interfaces.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.library.management.service.interfaces.NotificationService;
import com.library.management.email.EmailService;
import com.library.management.service.interfaces.NotificationService;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRecordRepository borrowRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;

    @Override
    public BorrowBookResponse borrowBook(BorrowBookRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        if (book.getAvailableCopies() <= 0) {
            throw new BadRequestException("Book not available");
        }

        if (borrowRepository.existsByBookAndUserAndStatus(
                book,
                user,
                BorrowStatus.BORROWED)) {

            throw new BadRequestException("Book already borrowed");
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        BorrowRecord record = BorrowRecord.builder()
                .user(user)
                .book(book)
                .borrowDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(14))
                .status(BorrowStatus.BORROWED)
                .build();

        record = borrowRepository.save(record);
        // Student Notification

        notificationService.notifyStudent(

                user.getId(),

                "Book Borrowed",

                "You have successfully borrowed \"" +

                        book.getTitle() +

                        "\".",

                "SUCCESS"

        );

// Admin Notification

        notificationService.notifyAdmins(

                "Book Borrowed",

                user.getFirstName() +

                        " " +

                        user.getLastName() +

                        " borrowed \"" +

                        book.getTitle() +

                        "\".",

                "INFO"

        );

// Student Email

        emailService.sendBorrowEmail(

                user.getEmail(),

                user.getFirstName(),

                book.getTitle(),

                record.getDueDate().toString()

        );
        notificationService.createNotification(

                user.getId(),

                "Book Borrowed",

                "You have successfully borrowed \"" +
                        book.getTitle() + "\".",

                "SUCCESS"

        );

        return map(record);
    }

    @Override
    public BorrowBookResponse returnBook(Long borrowId) {

        BorrowRecord record = borrowRepository.findById(borrowId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Borrow record not found"));

        if (record.getStatus() == BorrowStatus.RETURNED) {
            throw new BadRequestException("Book already returned");
        }

        record.setReturnDate(LocalDate.now());
        record.setStatus(BorrowStatus.RETURNED);
        long lateDays = java.time.temporal.ChronoUnit.DAYS.between(
                record.getDueDate(),
                record.getReturnDate()
        );

        if (lateDays > 0) {

            record.setFine(lateDays * 10.0);

        } else {

            record.setFine(0.0);

        }

        Book book = record.getBook();
        User user = record.getUser();

        book.setAvailableCopies(book.getAvailableCopies() + 1);

        bookRepository.save(book);

        borrowRepository.save(record);
        // Student Notification

        notificationService.notifyStudent(

                user.getId(),

                "Book Returned",

                "You have successfully returned \"" +

                        book.getTitle() +

                        "\".",

                "SUCCESS"

        );

// Admin Notification

        notificationService.notifyAdmins(

                "Book Returned",

                user.getFirstName() +

                        " " +

                        user.getLastName() +

                        " returned \"" +

                        book.getTitle() +

                        "\".",

                "INFO"

        );

// Student Email

        emailService.sendReturnEmail(

                user.getEmail(),

                user.getFirstName(),

                book.getTitle()

        );
        notificationService.createNotification(

                record.getUser().getId(),

                "Book Returned",

                "You have successfully returned \"" +
                        record.getBook().getTitle() + "\".",

                "INFO"

        );

        return map(record);
    }

    @Override
    public List<BorrowBookResponse> getBorrowHistory(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return borrowRepository.findByUser(user)
                .stream()
                .map(this::map)
                .toList();
    }

    private BorrowBookResponse map(BorrowRecord record) {

        return BorrowBookResponse.builder()
                .borrowId(record.getId())
                .studentName(record.getUser().getFirstName() + " " +
                        record.getUser().getLastName())
                .bookTitle(record.getBook().getTitle())
                .borrowDate(record.getBorrowDate())
                .dueDate(record.getDueDate())
                .returnDate(record.getReturnDate())
                .status(record.getStatus())
                .fine(record.getFine())
                .build();
    }

}