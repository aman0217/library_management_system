package com.library.management.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileUpdateRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    @Pattern(
            regexp = "^[A-Za-z ]+$",
            message = "First name can contain only letters"
    )
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50)
    @Pattern(
            regexp = "^[A-Za-z ]+$",
            message = "Last name can contain only letters"
    )
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid phone number"
    )
    private String phoneNumber;

}