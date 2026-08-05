package com.library.management.service.impl;

import com.library.management.dto.request.BookRequest;
import com.library.management.dto.response.BookResponse;
import com.library.management.entity.Book;
import com.library.management.exception.ResourceAlreadyExistsException;
import com.library.management.exception.ResourceNotFoundException;
import com.library.management.repository.BookRepository;
import com.library.management.service.interfaces.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.library.management.specification.BookSpecification;
import org.springframework.data.jpa.domain.Specification;
import com.library.management.upload.FileStorageService;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final FileStorageService fileStorageService;

    @Override
    public BookResponse addBook(BookRequest request) {

        if (bookRepository.existsByIsbn(request.getIsbn())) {
            throw new ResourceAlreadyExistsException("Book with this ISBN already exists");
        }

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .isbn(request.getIsbn())
                .publisher(request.getPublisher())
                .publicationYear(request.getPublicationYear())
                .totalCopies(request.getTotalCopies())
                .availableCopies(request.getTotalCopies())
                .category(request.getCategory())

                .active(true)
                .build();

        Book savedBook = bookRepository.save(book);

        return BookResponse.builder()
                .id(savedBook.getId())
                .title(savedBook.getTitle())
                .author(savedBook.getAuthor())
                .isbn(savedBook.getIsbn())
                .publisher(savedBook.getPublisher())
                .publicationYear(savedBook.getPublicationYear())
                .totalCopies(savedBook.getTotalCopies())
                .availableCopies(savedBook.getAvailableCopies())
                .category(savedBook.getCategory())
                .coverImage(savedBook.getCoverImage())
                .active(savedBook.getActive())
                .build();
    }

    @Override
    public List<BookResponse> getAllBooks() {

        return bookRepository.findAll()
                .stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();
    }

    @Override
    public BookResponse getBookById(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .publisher(book.getPublisher())
                .publicationYear(book.getPublicationYear())
                .totalCopies(book.getTotalCopies())
                .availableCopies(book.getAvailableCopies())
                .category(book.getCategory())
                .coverImage(book.getCoverImage())
                .active(book.getActive())
                .build();
    }

    @Override
    public BookResponse updateBook(Long id, BookRequest request) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        if (!book.getIsbn().equals(request.getIsbn())
                && bookRepository.existsByIsbn(request.getIsbn())) {

            throw new ResourceAlreadyExistsException("Book with this ISBN already exists");
        }

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setPublisher(request.getPublisher());
        book.setPublicationYear(request.getPublicationYear());
        book.setCategory(request.getCategory());

        int borrowedCopies = book.getTotalCopies() - book.getAvailableCopies();

        book.setTotalCopies(request.getTotalCopies());

        book.setAvailableCopies(request.getTotalCopies() - borrowedCopies);

        Book updatedBook = bookRepository.save(book);

        return BookResponse.builder()
                .id(updatedBook.getId())
                .title(updatedBook.getTitle())
                .author(updatedBook.getAuthor())
                .isbn(updatedBook.getIsbn())
                .publisher(updatedBook.getPublisher())
                .publicationYear(updatedBook.getPublicationYear())
                .totalCopies(updatedBook.getTotalCopies())
                .availableCopies(updatedBook.getAvailableCopies())
                .category(updatedBook.getCategory())
                .coverImage(updatedBook.getCoverImage())
                .active(updatedBook.getActive())
                .build();
    }

    @Override
    public void deleteBook(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        book.setActive(false);

        bookRepository.save(book);
    }

    // ==============================
    // Search Methods (Temporary)
    // ==============================

    @Override
    public List<BookResponse> searchByTitle(String title) {

        return bookRepository
                .findByTitleContainingIgnoreCaseAndActiveTrue(title)
                .stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();
    }

    @Override
    public List<BookResponse> searchByAuthor(String author) {

        return bookRepository
                .findByAuthorContainingIgnoreCaseAndActiveTrue(author)
                .stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();
    }

    @Override
    public List<BookResponse> searchByCategory(String category) {

        return bookRepository
                .findByCategoryContainingIgnoreCaseAndActiveTrue(category)
                .stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();
    }

    @Override
    public List<BookResponse> searchByIsbn(String isbn) {

        return bookRepository
                .findByIsbnContainingIgnoreCaseAndActiveTrue(isbn)
                .stream()
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();
    }
    @Override
    public Page<BookResponse> getBooks(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Book> books = bookRepository.findByActiveTrue(pageable);

        List<BookResponse> responseList = books.getContent()
                .stream()
//                .filter(Book::getActive)
                .map(book -> BookResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .isbn(book.getIsbn())
                        .publisher(book.getPublisher())
                        .publicationYear(book.getPublicationYear())
                        .totalCopies(book.getTotalCopies())
                        .availableCopies(book.getAvailableCopies())
                        .category(book.getCategory())
                        .coverImage(book.getCoverImage())
                        .active(book.getActive())
                        .build())
                .toList();

        return new PageImpl<>(
                responseList,
                pageable,
                books.getTotalElements()
        );
    }
    @Override
    public Page<BookResponse> searchBooks(
            String keyword,
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Book> books = bookRepository
                .findByTitleContainingIgnoreCaseAndActiveTrueOrAuthorContainingIgnoreCaseAndActiveTrueOrIsbnContainingIgnoreCaseAndActiveTrue(
                        keyword,
                        keyword,
                        keyword,
                        pageable
                );

        return books.map(book -> BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .publisher(book.getPublisher())
                .publicationYear(book.getPublicationYear())
                .totalCopies(book.getTotalCopies())
                .availableCopies(book.getAvailableCopies())
                .category(book.getCategory())
                .coverImage(book.getCoverImage())
                .active(book.getActive())
                .build());
    }
    @Override
    public Page<BookResponse> filterBooks(
            String keyword,
            String category,
            String publisher,
            Boolean active,
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Book> specification = Specification
                .where(BookSpecification.hasKeyword(keyword))
                .and(BookSpecification.hasCategory(category))
                .and(BookSpecification.hasPublisher(publisher))
                .and(BookSpecification.isActive(active));

        Page<Book> books = bookRepository.findAll(specification, pageable);

        return books.map(book -> BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .publisher(book.getPublisher())
                .publicationYear(book.getPublicationYear())
                .totalCopies(book.getTotalCopies())
                .availableCopies(book.getAvailableCopies())
                .category(book.getCategory())
                .coverImage(book.getCoverImage())
                .active(book.getActive())
                .build());
    }
    @Override
    public String uploadBookCover(Long bookId, MultipartFile file) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        // Delete old image if it exists
        if (book.getCoverImage() != null &&
                !book.getCoverImage().isBlank()) {

            fileStorageService.deleteFile(book.getCoverImage());
        }

        // Upload new image
        String imagePath = fileStorageService.uploadBookCover(file);

        book.setCoverImage(imagePath);

        bookRepository.save(book);

        return imagePath;
    }
}