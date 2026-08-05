package com.library.management.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueBookRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long bookId;
}