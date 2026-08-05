package com.library.management.service.impl;

import com.library.management.dto.request.UserRegistrationRequest;
import com.library.management.dto.response.UserResponse;
import com.library.management.email.EmailService;
import com.library.management.entity.User;
import com.library.management.enums.Role;
import com.library.management.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserServiceImpl userService;

    private UserRegistrationRequest request;

    @BeforeEach
    void setUp() {

        request = new UserRegistrationRequest();
        request.setFirstName("Aman");
        request.setLastName("Thakur");
        request.setUsername("aman");
        request.setEmail("aman@gmail.com");
        request.setPassword("123456");
        request.setPhoneNumber("9876543210");
        request.setRole(Role.ADMIN);
    }

    @Test
    void registerUser_ShouldRegisterSuccessfully() {

        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.existsByPhoneNumber(anyString())).thenReturn(false);

        when(passwordEncoder.encode(anyString()))
                .thenReturn("encodedPassword");

        User savedUser = User.builder()
                .id(1L)
                .firstName("Aman")
                .lastName("Thakur")
                .username("aman")
                .email("aman@gmail.com")
                .password("encodedPassword")
                .phoneNumber("9876543210")
                .role(Role.ADMIN)
                .build();

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        UserResponse response = userService.registerUser(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Aman", response.getFirstName());
        assertEquals("Thakur", response.getLastName());
        assertEquals("aman", response.getUsername());
        assertEquals("aman@gmail.com", response.getEmail());
        assertEquals("9876543210", response.getPhoneNumber());
        assertEquals(Role.ADMIN, response.getRole());

        verify(passwordEncoder).encode("123456");
        verify(userRepository).save(any(User.class));

        verify(emailService).sendRegistrationEmail(
                "aman@gmail.com",
                "Aman"
        );
    }
}