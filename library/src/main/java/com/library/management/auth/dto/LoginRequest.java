package com.library.management.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(
        name = "Login Request",
        description = "Request object used for user authentication"
)
public class LoginRequest {

    @Schema(
            description = "Registered email address",
            example = "admin@gmail.com",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;

    @Schema(
            description = "User password",
            example = "Admin@123",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Password is required")
    private String password;
}