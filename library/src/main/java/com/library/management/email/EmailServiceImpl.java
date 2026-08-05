package com.library.management.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    /**
     * Common Email Sender
     */
    private void sendEmail(
            String to,
            String subject,
            String body
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);

        message.setSubject(subject);

        message.setText(body);

        mailSender.send(message);

    }

    /**
     * Registration Email
     */
    @Override
    public void sendRegistrationEmail(
            String to,
            String firstName
    ) {

        sendEmail(

                to,

                "Welcome to Library Management System",

                """
                Hello %s,

                Your registration has been completed successfully.

                Welcome to our Library Management System.

                Happy Reading!

                Library Team
                """.formatted(firstName)

        );

    }

    /**
     * Welcome Email
     */
    @Override
    public void sendWelcomeEmail(
            String to,
            String firstName
    ) {

        sendEmail(

                to,

                "Welcome",

                """
                Dear %s,

                Welcome to our Library.

                We are happy to have you with us.

                Enjoy Reading!

                Library Team
                """.formatted(firstName)

        );

    }

    /**
     * Borrow Email
     */
    @Override
    public void sendBorrowEmail(
            String to,
            String firstName,
            String bookTitle,
            String dueDate
    ) {

        sendEmail(

                to,

                "Book Borrowed Successfully",

                """
                Dear %s,

                You have successfully borrowed:

                %s

                Due Date:

                %s

                Please return the book before the due date to avoid fines.

                Thank You

                Library Team
                """.formatted(

                        firstName,

                        bookTitle,

                        dueDate

                )

        );

    }

    /**
     * Return Email
     */
    @Override
    public void sendReturnEmail(
            String to,
            String firstName,
            String bookTitle
    ) {

        sendEmail(

                to,

                "Book Returned",

                """
                Dear %s,

                Thank you for returning:

                %s

                Hope you enjoyed reading it.

                Library Team
                """.formatted(

                        firstName,

                        bookTitle

                )

        );

    }

    /**
     * Due Reminder
     */
    @Override
    public void sendDueReminderEmail(
            String to,
            String firstName,
            String bookTitle,
            String dueDate
    ) {

        sendEmail(

                to,

                "Book Due Reminder",

                """
                Dear %s,

                This is a reminder that your borrowed book

                %s

                is due on

                %s

                Please return it on time to avoid late fees.

                Library Team
                """.formatted(

                        firstName,

                        bookTitle,

                        dueDate

                )

        );

    }

    /**
     * Fine Email
     */
    @Override
    public void sendFineEmail(
            String to,
            String firstName,
            String bookTitle,
            Double fine
    ) {

        sendEmail(

                to,

                "Library Fine",

                """
                Dear %s,

                A fine has been generated for the book

                %s

                Fine Amount:

                ₹ %.2f

                Please pay the fine as soon as possible.

                Library Team
                """.formatted(

                        firstName,

                        bookTitle,

                        fine

                )

        );

    }

}