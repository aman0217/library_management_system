package com.library.management.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(
        name = "Book Response",
        description = "Response object containing book details"
)
public class BookResponse {

    @Schema(
            description = "Unique ID of the book",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private Long id;

    @Schema(
            description = "Title of the book",
            example = "Effective Java"
    )
    private String title;

    @Schema(
            description = "Author of the book",
            example = "Joshua Bloch"
    )
    private String author;

    @Schema(
            description = "Unique ISBN number",
            example = "9780134685991"
    )
    private String isbn;

    @Schema(
            description = "Publisher of the book",
            example = "Addison-Wesley"
    )
    private String publisher;

    @Schema(
            description = "Publication year",
            example = "2018"
    )
    private Integer publicationYear;

    @Schema(
            description = "Total copies in library",
            example = "10"
    )
    private Integer totalCopies;

    @Schema(
            description = "Currently available copies",
            example = "7"
    )
    private Integer availableCopies;

    @Schema(
            description = "Book category",
            example = "Programming"
    )
    private String category;
    private String coverImage;

    @Schema(
            description = "Whether the book is active",
            example = "true"
    )
    private Boolean active;
}