package com.library.management.auth;

import com.library.management.auth.dto.LoginRequest;
import com.library.management.auth.dto.LoginResponse;
import com.library.management.auth.jwt.JwtService;
import com.library.management.entity.User;
import com.library.management.enums.Role;
import com.library.management.exception.InvalidCredentialsException;
import com.library.management.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .id(1L)
                .firstName("Aman")
                .lastName("Thakur")
                .username("aman")
                .email("aman@gmail.com")
                .password("encodedPassword")
                .phoneNumber("9876543210")
                .role(Role.ADMIN)
                .build();
    }

    @Test
    void login_ShouldReturnToken_WhenCredentialsAreValid() {

        LoginRequest request = new LoginRequest();
        request.setEmail("aman@gmail.com");
        request.setPassword("password");

        when(userRepository.findByEmail("aman@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("password", "encodedPassword"))
                .thenReturn(true);

        when(jwtService.generateToken("aman@gmail.com"))
                .thenReturn("jwt-token");

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("aman", response.getUsername());
        assertEquals("aman@gmail.com", response.getEmail());
        assertEquals(Role.ADMIN, response.getRole());
        assertEquals("jwt-token", response.getToken());

        verify(userRepository, times(1))
                .findByEmail("aman@gmail.com");

        verify(passwordEncoder, times(1))
                .matches("password", "encodedPassword");

        verify(jwtService, times(1))
                .generateToken("aman@gmail.com");
    }

    @Test
    void login_ShouldThrowException_WhenPasswordIsWrong() {

        LoginRequest request = new LoginRequest();
        request.setEmail("aman@gmail.com");
        request.setPassword("wrong-password");

        when(userRepository.findByEmail("aman@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("wrong-password", "encodedPassword"))
                .thenReturn(false);

        assertThrows(
                InvalidCredentialsException.class,
                () -> authService.login(request)
        );

        verify(jwtService, never()).generateToken(anyString());
    }

    @Test
    void login_ShouldThrowException_WhenUserDoesNotExist() {

        LoginRequest request = new LoginRequest();
        request.setEmail("unknown@gmail.com");
        request.setPassword("password");

        when(userRepository.findByEmail("unknown@gmail.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                InvalidCredentialsException.class,
                () -> authService.login(request)
        );

        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtService, never()).generateToken(anyString());
    }
}