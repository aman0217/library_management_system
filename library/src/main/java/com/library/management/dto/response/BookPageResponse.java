package com.library.management.dto.response;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookPageResponse {

    private List<BookResponse> books;

    private int currentPage;

    private int totalPages;

    private long totalElements;

    private boolean first;

    private boolean last;
}