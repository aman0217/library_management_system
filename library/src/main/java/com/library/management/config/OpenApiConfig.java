package com.library.management.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Library Management System API",
                version = "1.0.0",
                description = """
                        Production-ready REST API for Library Management System.

                        Features:
                        • JWT Authentication
                        • Role Based Authorization
                        • Book Management
                        • User Management
                        • Book Issue & Return
                        • Dashboard
                        • Pagination
                        • Sorting
                        • Search
                        • Global Exception Handling
                        """,
                contact = @Contact(
                        name = "Aman Thakur",
                        email = "aman@example.com"
                ),
                license = @License(
                        name = "MIT License"
                )
        )
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {

}