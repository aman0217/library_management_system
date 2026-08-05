package com.library.management.service.interfaces;

import com.library.management.dto.request.UserRegistrationRequest;
import com.library.management.dto.request.UserUpdateRequest;
import com.library.management.dto.request.ProfileUpdateRequest;
import com.library.management.dto.request.ChangePasswordRequest;
import com.library.management.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse registerUser(UserRegistrationRequest request);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long id,
                            UserUpdateRequest request);

    void deleteUser(Long id, String adminPassword);

    UserResponse updateProfile(
            Long userId,
            ProfileUpdateRequest request
    );

    void changePassword(
            Long userId,
            ChangePasswordRequest request
    );
}