package com.library.management.specification;

import com.library.management.entity.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    private BookSpecification() {
    }

    public static Specification<Book> hasKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return cb.conjunction();
            }

            String search = "%" + keyword.toLowerCase() + "%";

            return cb.or(

                    cb.like(cb.lower(root.get("title")), search),

                    cb.like(cb.lower(root.get("author")), search),

                    cb.like(cb.lower(root.get("isbn")), search)

            );
        };
    }

    public static Specification<Book> hasCategory(String category) {

        return (root, query, cb) -> {

            if (category == null || category.trim().isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(root.get("category")),
                    "%" + category.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Book> hasPublisher(String publisher) {

        return (root, query, cb) -> {

            if (publisher == null || publisher.trim().isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(root.get("publisher")),
                    "%" + publisher.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Book> isActive(Boolean active) {

        return (root, query, cb) -> {

            if (active == null) {
                return cb.conjunction();
            }

            return cb.equal(root.get("active"), active);
        };
    }
}