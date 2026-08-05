package com.library.management.repository.projection;

public interface MonthlyBorrowStatisticsProjection {

    Integer getYear();

    Integer getMonth();

    Long getBorrowCount();

}