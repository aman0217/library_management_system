package com.library.management.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowBookRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long bookId;
}