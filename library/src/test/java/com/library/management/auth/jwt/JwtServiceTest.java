package com.library.management.auth.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {

        jwtService = new JwtService();

        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                "1234567890123456789012345678901234567890123456789012345678901234"
        );

        ReflectionTestUtils.setField(
                jwtService,
                "expiration",
                86400000L
        );
    }

    @Test
    void generateToken_ShouldReturnToken() {

        String token = jwtService.generateToken("aman@gmail.com");

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void extractEmail_ShouldReturnCorrectEmail() {

        String token = jwtService.generateToken("aman@gmail.com");

        String email = jwtService.extractEmail(token);

        assertEquals("aman@gmail.com", email);
    }

    @Test
    void isTokenValid_ShouldReturnTrue() {

        String token = jwtService.generateToken("aman@gmail.com");

        assertTrue(jwtService.isTokenValid(token));
    }

    @Test
    void isTokenValid_ShouldReturnFalse() {

        assertFalse(jwtService.isTokenValid("invalid.token.value"));
    }
}