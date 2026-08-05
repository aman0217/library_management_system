package com.library.management.auth.controller;

import com.library.management.auth.RefreshTokenService;
import com.library.management.auth.dto.RefreshTokenRequest;
import com.library.management.auth.dto.RefreshTokenResponse;
import com.library.management.auth.jwt.JwtService;
import com.library.management.entity.RefreshToken;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        RefreshToken refreshToken =
                refreshTokenService.verifyRefreshToken(
                        request.getRefreshToken());

        String accessToken =
                jwtService.generateToken(
                        refreshToken.getUser().getEmail());

        return ResponseEntity.ok(
                RefreshTokenResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken.getToken())
                        .tokenType("Bearer")
                        .build()
        );
    }
}