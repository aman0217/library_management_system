package com.library.management.repository.projection;

public interface NeverBorrowedBookProjection {

    Long getBookId();

    String getTitle();

    String getAuthor();

    String getCategory();

}