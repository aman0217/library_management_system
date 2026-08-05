package com.library.management.controller;

import com.library.management.dto.response.NotificationResponse;
import com.library.management.service.interfaces.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // Create Notification
    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(

            @RequestParam Long userId,

            @RequestParam String title,

            @RequestParam String message,

            @RequestParam String type
    ) {

        return ResponseEntity.ok(

                notificationService.createNotification(

                        userId,

                        title,

                        message,

                        type

                )

        );

    }

    // Get All Notifications
    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationResponse>> getNotifications(

            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(

                notificationService.getNotifications(userId)

        );

    }

    // Get Unread Notifications
    @GetMapping("/unread/{userId}")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(

            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(

                notificationService.getUnreadNotifications(userId)

        );

    }

    // Unread Count
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getUnreadCount(

            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(

                notificationService.getUnreadCount(userId)

        );

    }

    // Mark As Read
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<String> markAsRead(

            @PathVariable Long notificationId
    ) {

        notificationService.markAsRead(notificationId);

        return ResponseEntity.ok("Notification marked as read");

    }

    // Delete Notification
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(

            @PathVariable Long notificationId
    ) {

        notificationService.deleteNotification(notificationId);

        return ResponseEntity.ok("Notification deleted successfully");

    }
    @PutMapping("/read-all/{userId}")
    public ResponseEntity<Void> markAllAsRead(
            @PathVariable Long userId
    ) {

        notificationService.markAllAsRead(userId);

        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/read/{userId}")
    public ResponseEntity<Void> deleteAllRead(
            @PathVariable Long userId
    ) {

        notificationService.deleteAllRead(userId);

        return ResponseEntity.ok().build();

    }

}