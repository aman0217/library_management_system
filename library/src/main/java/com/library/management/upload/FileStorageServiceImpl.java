package com.library.management.upload;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import com.library.management.exception.BadRequestException;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final String UPLOAD_DIR = "uploads/books";

    @Override
    public String uploadBookCover(MultipartFile file) {


        try {
            if (file.isEmpty()) {
                throw new BadRequestException("Please select an image.");
            }

            String contentType = file.getContentType();

            if (contentType == null ||
                    (!contentType.equals("image/jpeg")
                            && !contentType.equals("image/png"))) {

                throw new BadRequestException(
                        "Only JPG and PNG images are allowed."
                );
            }

            if (file.getSize() > 2 * 1024 * 1024) {
                throw new BadRequestException(
                        "Maximum file size is 2 MB."
                );
            }

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID()
                    + "_"
                    + file.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return "/uploads/books/" + fileName;

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload image.");
        }
    }
    @Override
    public void deleteFile(String imagePath) {

        try {

            if (imagePath == null || imagePath.isBlank()) {
                return;
            }

            Path path = Paths.get(imagePath.replaceFirst("/", ""));

            Files.deleteIfExists(path);

        } catch (IOException e) {

            throw new RuntimeException("Unable to delete old image.");

        }

    }
}