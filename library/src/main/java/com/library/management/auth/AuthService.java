package com.library.management.auth;

import com.library.management.auth.dto.LoginRequest;
import com.library.management.auth.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
    void logout(String email);
}