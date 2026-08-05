package com.library.management.repository.projection;

public interface TopActiveStudentProjection {

    Long getUserId();

    String getFirstName();

    String getLastName();

    Long getBorrowCount();

}