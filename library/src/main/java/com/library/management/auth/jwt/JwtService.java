package com.library.management.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // Refresh Token Expiration = 7 Days
    private static final long REFRESH_TOKEN_EXPIRATION =
            7L * 24 * 60 * 60 * 1000;

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

    }

    // ==========================
    // Access Token
    // ==========================

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis() + expiration
                        )
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    // ==========================
    // Refresh JWT
    // ==========================

    public String generateRefreshJwt(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + REFRESH_TOKEN_EXPIRATION
                        )
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    // ==========================
    // Extract Email
    // ==========================

    public String extractEmail(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();

    }

    // ==========================
    // Validate Token
    // ==========================

    public boolean isTokenValid(String token) {

        try {

            extractEmail(token);

            return true;

        } catch (Exception ex) {

            return false;

        }

    }

}