package com.library.management.repository;

import com.library.management.entity.Book;
import com.library.management.entity.BorrowRecord;
import com.library.management.entity.User;
import com.library.management.enums.BorrowStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUser(User user);
    long countByStatus(BorrowStatus status);

    List<BorrowRecord> findByStatus(BorrowStatus status);

    boolean existsByBookAndUserAndStatus(
            Book book,
            User user,
            BorrowStatus status
    );
}