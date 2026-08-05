package com.library.management.repository;

import com.library.management.entity.Notification;
import com.library.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // User ki saari notifications (latest first)
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Sirf unread notifications
    List<Notification> findByUserAndReadFalseOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndReadTrue(User user);
    @Modifying
    @Query("""
UPDATE Notification n
SET n.read = true
WHERE n.user.id = :userId
AND n.read = false
""")
    void markAllAsRead(@Param("userId") Long userId);

    // Unread notification count
    long countByUserAndReadFalse(User user);
    long countByUserIdAndReadFalse(Long userId);

}