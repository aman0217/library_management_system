package com.library.management.repository;
import com.library.management.repository.projection.MostBorrowedBookProjection;
import org.springframework.data.jpa.repository.Query;
import com.library.management.repository.projection.TopActiveStudentProjection;

import com.library.management.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import com.library.management.repository.projection.MonthlyBorrowStatisticsProjection;

import java.time.LocalDate;
import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {

    long countByReturnedFalse();

    long countByReturnedTrue();

    long countByReturnedFalseAndDueDateBefore(LocalDate date);

    boolean existsByUserIdAndBookIdAndReturnedFalse(
            Long userId,
            Long bookId
    );

    List<IssueRecord> findByUserIdOrderByIssueDateDesc(Long userId);

    List<IssueRecord> findByReturnedFalseAndDueDateBefore(LocalDate date);

    List<IssueRecord> findByUserIdAndReturnedFalseOrderByIssueDateDesc(Long userId);
    List<IssueRecord> findByUserIdAndReturnedFalseAndDueDateBetween(
            Long userId,
            LocalDate start,
            LocalDate end
    );
    @Query("""
SELECT
    ir.book.id AS bookId,
    ir.book.title AS title,
    ir.book.author AS author,
    COUNT(ir.id) AS borrowCount
FROM IssueRecord ir
GROUP BY
    ir.book.id,
    ir.book.title,
    ir.book.author
ORDER BY COUNT(ir.id) DESC
""")
    List<MostBorrowedBookProjection> getMostBorrowedBooks();
    @Query("""
SELECT
    ir.user.id AS userId,
    ir.user.firstName AS firstName,
    ir.user.lastName AS lastName,
    COUNT(ir.id) AS borrowCount
FROM IssueRecord ir
GROUP BY
    ir.user.id,
    ir.user.firstName,
    ir.user.lastName
ORDER BY COUNT(ir.id) DESC
""")
    List<TopActiveStudentProjection> getTopActiveStudents();
    @Query("""
SELECT
    YEAR(ir.issueDate) AS year,
    MONTH(ir.issueDate) AS month,
    COUNT(ir.id) AS borrowCount
FROM IssueRecord ir
GROUP BY
    YEAR(ir.issueDate),
    MONTH(ir.issueDate)
ORDER BY
    YEAR(ir.issueDate),
    MONTH(ir.issueDate)
""")
    List<MonthlyBorrowStatisticsProjection> getMonthlyBorrowStatistics();
}