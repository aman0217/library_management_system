package com.library.management.upload;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String uploadBookCover(MultipartFile file);
    void deleteFile(String imagePath);

}