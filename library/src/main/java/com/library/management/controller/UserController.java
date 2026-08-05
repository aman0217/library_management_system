package com.library.management.controller;

import com.library.management.dto.request.UserRegistrationRequest;
import com.library.management.dto.request.DeleteUserRequest;
import com.library.management.dto.request.UserUpdateRequest;
import com.library.management.dto.request.ProfileUpdateRequest;
import com.library.management.dto.request.ChangePasswordRequest;
import com.library.management.dto.response.UserResponse;
import com.library.management.service.interfaces.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.library.management.auth.userdetails.UserDetailsImpl;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        UserResponse response = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        UserResponse response = UserResponse.builder()
                .id(userDetails.getId())
                .firstName(userDetails.getFirstName())
                .lastName(userDetails.getLastName())
                .username(userDetails.getActualUsername())
                .email(userDetails.getEmail())
                .phoneNumber(userDetails.getPhoneNumber())
                .role(userDetails.getRole())
                .build();

        return ResponseEntity.ok(response);
    }
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileUpdateRequest request) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(

                userService.updateProfile(

                        userDetails.getId(),

                        request

                )

        );

    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        userService.changePassword(

                userDetails.getId(),

                request

        );

        return ResponseEntity.ok(
                "Password changed successfully"
        );

    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(userService.getAllUsers());

    }
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {

        return ResponseEntity.ok(
                userService.updateUser(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id,
            @Valid @RequestBody DeleteUserRequest request) {

        userService.deleteUser(
                id,
                request.getAdminPassword()
        );

        return ResponseEntity.ok().build();

    }
}
