package com.library.management.email;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {

    // Registration
    void sendRegistrationEmail(
            String to,
            String firstName
    );

    // Book Borrowed
    @Async
    void sendBorrowEmail(
            String to,
            String firstName,
            String bookTitle,
            String dueDate
    );

    // Book Returned
    @Async
    void sendReturnEmail(
            String to,
            String firstName,
            String bookTitle
    );

    // Due Reminder
    void sendDueReminderEmail(
            String to,
            String firstName,
            String bookTitle,
            String dueDate
    );

    // Fine Generated
    void sendFineEmail(
            String to,
            String firstName,
            String bookTitle,
            Double fine
    );

    // Welcome
    void sendWelcomeEmail(
            String to,
            String firstName
    );

}