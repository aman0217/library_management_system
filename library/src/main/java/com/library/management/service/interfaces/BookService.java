package com.library.management.service.interfaces;

import com.library.management.dto.request.BookRequest;
import com.library.management.dto.response.BookResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {

    BookResponse addBook(BookRequest request);

    List<BookResponse> getAllBooks();

    BookResponse getBookById(Long id);

    BookResponse updateBook(Long id, BookRequest request);

    void deleteBook(Long id);

    List<BookResponse> searchByTitle(String title);

    List<BookResponse> searchByAuthor(String author);

    List<BookResponse> searchByCategory(String category);

    List<BookResponse> searchByIsbn(String isbn);

    // Existing Pagination API
    Page<BookResponse> getBooks(
            int page,
            int size,
            String sortBy,
            String direction
    );

    // NEW : Pagination + Keyword Search
    Page<BookResponse> searchBooks(
            String keyword,
            int page,
            int size,
            String sortBy,
            String direction
    );

    Page<BookResponse> filterBooks(
            String keyword,
            String category,
            String publisher,
            Boolean active,
            int page,
            int size,
            String sortBy,
            String direction
    );
    String uploadBookCover(Long bookId, MultipartFile file);

}