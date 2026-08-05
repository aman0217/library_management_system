package com.library.management.auth.dto;

import com.library.management.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "Login Response",
        description = "Response returned after successful authentication"
)
public class LoginResponse {

    @Schema(
            description = "User ID",
            example = "1"
    )
    private Long id;

    @Schema(
            description = "Username",
            example = "admin"
    )
    private String username;

    @Schema(
            description = "Registered email",
            example = "admin@gmail.com"
    )
    private String email;

    @Schema(
            description = "User role",
            example = "ADMIN"
    )
    private Role role;

    @Schema(
            description = "JWT Access Token",
            example = "eyJhbGciOiJIUzI1NiJ9..."
    )
    private String token;
}