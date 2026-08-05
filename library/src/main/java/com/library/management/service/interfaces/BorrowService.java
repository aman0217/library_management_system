package com.library.management.service.interfaces;

import com.library.management.dto.request.BorrowBookRequest;
import com.library.management.dto.response.BorrowBookResponse;

import java.util.List;

public interface BorrowService {

    BorrowBookResponse borrowBook(BorrowBookRequest request);

    BorrowBookResponse returnBook(Long borrowId);

    List<BorrowBookResponse> getBorrowHistory(Long userId);

}