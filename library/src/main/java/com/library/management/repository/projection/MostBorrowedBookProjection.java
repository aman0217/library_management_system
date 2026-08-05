package com.library.management.repository.projection;

public interface MostBorrowedBookProjection {

    Long getBookId();

    String getTitle();

    String getAuthor();

    Long getBorrowCount();

}