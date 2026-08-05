package com.library.management.service.interfaces;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.IssueResponse;

import java.util.List;

public interface IssueService {

    IssueResponse issueBook(IssueBookRequest request);

    IssueResponse returnBook(Long issueId);

    List<IssueResponse> getBorrowHistory(Long userId);
    List<IssueResponse> getCurrentBorrowedBooks(Long userId);
    List<IssueResponse> getOverdueBooks();
}