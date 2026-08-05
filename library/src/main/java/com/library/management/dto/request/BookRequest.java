package com.library.management.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(
        name = "Book Request",
        description = "Request object used to create or update a book"
)
public class BookRequest {

    @Schema(
            description = "Title of the book",
            example = "Effective Java",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Title is required")
    private String title;

    @Schema(
            description = "Author of the book",
            example = "Joshua Bloch",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Author is required")
    private String author;

    @Schema(
            description = "Unique ISBN number of the book",
            example = "9780134685991",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "ISBN is required")
    private String isbn;

    @Schema(
            description = "Publisher of the book",
            example = "Addison-Wesley",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Publisher is required")
    private String publisher;

    @Schema(
            description = "Publication year of the book",
            example = "2018",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotNull(message = "Publication year is required")
    private Integer publicationYear;

    @Schema(
            description = "Total number of copies available in the library",
            example = "10",
            minimum = "1",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotNull(message = "Total copies is required")
    @Min(value = 1, message = "Total copies must be at least 1")
    private Integer totalCopies;

    @Schema(
            description = "Category or genre of the book",
            example = "Programming",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Category is required")
    private String category;
}