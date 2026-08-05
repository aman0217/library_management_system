package com.library.management.repository;

import com.library.management.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.library.management.repository.projection.NeverBorrowedBookProjection;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long>,
        JpaSpecificationExecutor<Book> {




    // ==========================
    // Existing Methods
    // ==========================

    boolean existsByIsbn(String isbn);

    Optional<Book> findByIsbn(String isbn);

    List<Book> findByTitleContainingIgnoreCaseAndActiveTrue(String title);

    List<Book> findByAuthorContainingIgnoreCaseAndActiveTrue(String author);

    List<Book> findByCategoryContainingIgnoreCaseAndActiveTrue(String category);

    List<Book> findByIsbnContainingIgnoreCaseAndActiveTrue(String isbn);

    // ==========================
    // Pagination
    // ==========================

    Page<Book> findByActiveTrue(Pageable pageable);

    // ==========================
    // Keyword Search + Pagination
    // ==========================

    Page<Book> findByTitleContainingIgnoreCaseAndActiveTrueOrAuthorContainingIgnoreCaseAndActiveTrueOrIsbnContainingIgnoreCaseAndActiveTrue(
            String title,
            String author,
            String isbn,
            Pageable pageable
    );

    // ==========================
// Dashboard
// ==========================

    long countByActiveTrue();
    long countByAvailableCopiesGreaterThan(Integer copies);
    @Query("""
SELECT
    b.id AS bookId,
    b.title AS title,
    b.author AS author,
    b.category AS category
FROM Book b
WHERE b.id NOT IN (
    SELECT ir.book.id
    FROM IssueRecord ir
)
AND b.active = true
ORDER BY b.title
""")
    List<NeverBorrowedBookProjection> getNeverBorrowedBooks();
}