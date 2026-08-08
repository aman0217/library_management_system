package com.library.management.repository;

import com.library.management.entity.IssueRecord;
import com.library.management.repository.projection.MonthlyBorrowStatisticsProjection;
import com.library.management.repository.projection.MostBorrowedBookProjection;
import com.library.management.repository.projection.TopActiveStudentProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {

    // =========================================================
    // BASIC COUNTS
    // =========================================================

    long countByReturnedFalse();

    long countByReturnedTrue();

    long countByReturnedFalseAndDueDateBefore(LocalDate date);


    // =========================================================
    // CHECK DUPLICATE ACTIVE BORROW
    // =========================================================

    @Query("""
        SELECT CASE WHEN COUNT(ir) > 0 THEN true ELSE false END
        FROM IssueRecord ir
        WHERE ir.user.id = :userId
        AND ir.book.id = :bookId
        AND ir.returned = false
    """)
    boolean existsByUserIdAndBookIdAndReturnedFalse(
            @Param("userId") Long userId,
            @Param("bookId") Long bookId
    );


    // =========================================================
    // BORROW HISTORY
    // IMPORTANT:
    // JOIN FETCH user + book
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findByUserIdOrderByIssueDateDesc(
            @Param("userId") Long userId
    );


    // =========================================================
    // CURRENT BORROWED BOOKS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        AND ir.returned = false
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findByUserIdAndReturnedFalseOrderByIssueDateDesc(
            @Param("userId") Long userId
    );


    // =========================================================
    // OVERDUE BOOKS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE ir.returned = false
        AND ir.dueDate < :date
        ORDER BY ir.dueDate ASC
    """)
    List<IssueRecord> findByReturnedFalseAndDueDateBefore(
            @Param("date") LocalDate date
    );


    // =========================================================
    // DUE SOON BOOKS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        AND ir.returned = false
        AND ir.dueDate BETWEEN :start AND :end
        ORDER BY ir.dueDate ASC
    """)
    List<IssueRecord> findByUserIdAndReturnedFalseAndDueDateBetween(
            @Param("userId") Long userId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );


    // =========================================================
    // DASHBOARD - MOST BORROWED BOOKS
    // =========================================================

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


    // =========================================================
    // DASHBOARD - TOP ACTIVE STUDENTS
    // =========================================================

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


    // =========================================================
    // DASHBOARD - MONTHLY BORROW STATISTICS
    // =========================================================

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


    // =========================================================
    // ALL ISSUE RECORDS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findAllWithUserAndBook();


    // =========================================================
    // STUDENT BORROW HISTORY
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findBorrowHistory(
            @Param("userId") Long userId
    );


    // =========================================================
    // STUDENT CURRENT BORROWED BOOKS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        AND ir.returned = false
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findBorrowedBooks(
            @Param("userId") Long userId
    );


    // =========================================================
    // STUDENT DUE SOON BOOKS
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        AND ir.returned = false
        AND ir.dueDate BETWEEN :start AND :end
        ORDER BY ir.dueDate ASC
    """)
    List<IssueRecord> findDueSoonBooks(
            @Param("userId") Long userId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );


    // =========================================================
    // STUDENT FINE HISTORY
    // =========================================================

    @Query("""
        SELECT ir
        FROM IssueRecord ir
        JOIN FETCH ir.user u
        JOIN FETCH ir.book b
        WHERE u.id = :userId
        ORDER BY ir.issueDate DESC
    """)
    List<IssueRecord> findFineHistory(
            @Param("userId") Long userId
    );
}