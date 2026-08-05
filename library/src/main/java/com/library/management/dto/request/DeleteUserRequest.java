package com.library.management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteUserRequest {

    @NotBlank(message = "Admin password is required")
    private String adminPassword;

}