package com.library.management.controller;

import com.library.management.dto.request.BookRequest;
import com.library.management.dto.response.BookResponse;
import com.library.management.service.interfaces.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(
        name = "Book Management",
        description = "APIs for managing library books"
)
@SecurityRequirement(name = "Bearer Authentication")
public class BookController {

    private final BookService bookService;

    // ===================== ADD BOOK =====================

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PostMapping
    @Operation(
            summary = "Add a new book",
            description = "Only ADMIN and LIBRARIAN can add books."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Book added successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "Access denied"),
            @ApiResponse(responseCode = "409", description = "ISBN already exists")
    })
    public ResponseEntity<BookResponse> addBook(
            @Valid @RequestBody BookRequest request) {

        BookResponse response = bookService.addBook(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ===================== SEARCH =====================

    @GetMapping("/search/title/{title}")
    public ResponseEntity<List<BookResponse>> searchByTitle(
            @PathVariable String title) {

        return ResponseEntity.ok(bookService.searchByTitle(title));
    }

    @GetMapping("/search/author/{author}")
    public ResponseEntity<List<BookResponse>> searchByAuthor(
            @PathVariable String author) {

        return ResponseEntity.ok(bookService.searchByAuthor(author));
    }

    @GetMapping("/search/category/{category}")
    public ResponseEntity<List<BookResponse>> searchByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(bookService.searchByCategory(category));
    }

    @GetMapping("/search/isbn/{isbn}")
    public ResponseEntity<List<BookResponse>> searchByIsbn(
            @PathVariable String isbn) {

        return ResponseEntity.ok(bookService.searchByIsbn(isbn));
    }

    // ===================== GET BOOK =====================

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(
            @PathVariable Long id) {

        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // ===================== UPDATE BOOK =====================

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookRequest request) {

        return ResponseEntity.ok(bookService.updateBook(id, request));
    }

    // ===================== DELETE BOOK =====================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(
            @PathVariable Long id) {

        bookService.deleteBook(id);

        return ResponseEntity.ok("Book deleted successfully");
    }

    // ===================== PAGINATION =====================

    @GetMapping
    public ResponseEntity<Page<BookResponse>> getBooks(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "title") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                bookService.getBooks(page, size, sortBy, direction)
        );
    }
    @GetMapping("/search")
    public ResponseEntity<Page<BookResponse>> searchBooks(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "title") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(

                bookService.searchBooks(
                        keyword,
                        page,
                        size,
                        sortBy,
                        direction
                )
        );
    }
    @GetMapping("/filter")
    public ResponseEntity<Page<BookResponse>> filterBooks(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) String category,

            @RequestParam(required = false) String publisher,

            @RequestParam(required = false) Boolean active,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "title") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(

                bookService.filterBooks(
                        keyword,
                        category,
                        publisher,
                        active,
                        page,
                        size,
                        sortBy,
                        direction
                )
        );
    }
    @PostMapping("/{bookId}/upload-cover")
    public ResponseEntity<String> uploadBookCover(

            @PathVariable Long bookId,

            @RequestParam("file") MultipartFile file
    ) {

        String imagePath = bookService.uploadBookCover(bookId, file);

        return ResponseEntity.ok(imagePath);
    }
}