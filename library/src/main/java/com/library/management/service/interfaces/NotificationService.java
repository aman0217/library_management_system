package com.library.management.service.interfaces;

import com.library.management.dto.response.NotificationResponse;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(
            Long userId,
            String title,
            String message,
            String type
    );

    // Student Notification
    void notifyStudent(
            Long studentId,
            String title,
            String message,
            String type
    );

    // Admin + Librarian Notification
    void notifyAdmins(
            String title,
            String message,
            String type
    );

    List<NotificationResponse> getNotifications(Long userId);

    List<NotificationResponse> getUnreadNotifications(Long userId);

    long getUnreadCount(Long userId);

    void markAsRead(Long notificationId);

    void deleteNotification(Long notificationId);
    void markAllAsRead(Long userId);

    void deleteAllRead(Long userId);

}