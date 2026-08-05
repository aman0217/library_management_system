package com.library.management.service.impl;

import com.library.management.dto.response.NotificationResponse;
import com.library.management.entity.Notification;
import com.library.management.entity.User;
import com.library.management.enums.NotificationType;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.NotificationRepository;
import com.library.management.repository.UserRepository;
import com.library.management.service.interfaces.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.library.management.enums.Role;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public NotificationResponse createNotification(
            Long userId,
            String title,
            String message,
            String type) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(NotificationType.valueOf(type.toUpperCase()))
                .read(false)
                .build();

        notification = notificationRepository.save(notification);

        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .read(notification.getRead())
                .createdAt(notification.getCreatedAt().toString())
                .build();

    }

    @Override
    public void notifyStudent(
            Long studentId,
            String title,
            String message,
            String type) {

        createNotification(
                studentId,
                title,
                message,
                type
        );

    }

    @Override
    public void notifyAdmins(
            String title,
            String message,
            String type) {

        List<User> admins = userRepository.findAll()
                .stream()
                .filter(user ->

                        user.getRole() == Role.ADMIN ||

                                user.getRole() == Role.LIBRARIAN

                )
                .toList();

        for (User admin : admins) {

            createNotification(

                    admin.getId(),

                    title,

                    message,

                    type

            );

        }

    }
    @Override
    public List<NotificationResponse> getNotifications(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .type(notification.getType())
                        .read(notification.getRead())
                        .createdAt(notification.getCreatedAt().toString())
                        .build())
                .toList();

    }

    @Override
    public List<NotificationResponse> getUnreadNotifications(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return notificationRepository
                .findByUserAndReadFalseOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .type(notification.getType())
                        .read(notification.getRead())
                        .createdAt(notification.getCreatedAt().toString())
                        .build())
                .toList();

    }
    @Override
    public long getUnreadCount(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return notificationRepository.countByUserAndReadFalse(user);

    }
    @Override
    public void markAsRead(Long notificationId) {

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"));

        notification.setRead(true);

        notificationRepository.save(notification);

    }

    @Override
    public void deleteNotification(Long notificationId) {

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"));

        notificationRepository.delete(notification);

    }
    @Override
    public void markAllAsRead(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        notificationRepository.markAllAsRead(userId);

    }
    @Override
    public void deleteAllRead(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        List<Notification> readNotifications =
                notificationRepository.findByUserAndReadTrue(user);

        notificationRepository.deleteAll(readNotifications);

    }
}