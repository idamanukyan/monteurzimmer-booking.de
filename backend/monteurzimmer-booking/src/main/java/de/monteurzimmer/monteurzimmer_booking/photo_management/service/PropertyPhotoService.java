package de.monteurzimmer.monteurzimmer_booking.photo_management.service;

import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.photo_management.repository.PropertyPhotoRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyPhotoService {

    private static final String UPLOAD_DIR = "client/storage/upload/icons/city";
    private final LogEntryService logEntryService;

    @Autowired
    private PropertyPhotoRepository propertyPhotoRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    public PropertyPhotoService(LogEntryService logEntryService) {
        this.logEntryService = logEntryService;
    }

    public PropertyPhoto addPhotoToProperty(Long propertyId, String photoUrl, boolean isPrimary) {
        logEntryService.log("INFO", "Attempting to add photo to property with ID: " + propertyId);

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> {
                    logEntryService.log("ERROR", "Property not found with ID: " + propertyId);
                    return new IllegalArgumentException("Property not found with id: " + propertyId);
                });

        PropertyPhoto photo = new PropertyPhoto();
        photo.setProperty(property);
        photo.setPhotoUrl(photoUrl);
        photo.setUploadedAt(LocalDateTime.now());
        photo.setIsPrimary(isPrimary);

        List<PropertyPhoto> propertyPhotos = property.getPhotos();
        propertyPhotos.add(photo);

        logEntryService.log("INFO", "Adding photo with URL: " + photoUrl + " to property with ID: " + propertyId);
        return propertyPhotoRepository.save(photo);
    }

    public List<String> getPhotosByPropertyId(Long propertyId) {
        logEntryService.log("INFO", "Fetching photos for property with ID: " + propertyId);
        List<PropertyPhoto> photos = propertyPhotoRepository.findByPropertyId(propertyId);

        if (photos.isEmpty()) {
            logEntryService.log("WARN", "No photos found for property ID: " + propertyId);
            throw new IllegalArgumentException("No photos found for property with ID: " + propertyId);
        }

        List<String> photoUrls = photos.stream()
                .map(PropertyPhoto::getPhotoUrl)
                .collect(Collectors.toList());

        logEntryService.log("INFO", "Successfully retrieved " + photoUrls.size() + " photos for property ID: " + propertyId);
        return photoUrls;
    }

    public String getPrimaryPhoto(Long propertyId) {
        logEntryService.log("INFO", "Fetching primary photo for property with ID: " + propertyId);
        PropertyPhoto photo = propertyPhotoRepository.findByPropertyIdAndIsPrimary(propertyId);

        if (photo == null) {
            logEntryService.log("WARN", "No primary photo found for property ID: " + propertyId);
            throw new IllegalArgumentException("No primary photo found for property with ID: " + propertyId);
        }

        logEntryService.log("INFO", "Successfully retrieved primary photo URL for property ID: " + propertyId);
        return photo.getPhotoUrl();
    }

    public String storePhoto(MultipartFile photoFile) {
        if (photoFile.isEmpty()) {
            logEntryService.log("ERROR", "Failed to store photo: file is empty");
            throw new IllegalArgumentException("Cannot store empty photo file.");
        }

        String fileName = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                logEntryService.log("INFO", "Created directory for photo storage: " + uploadPath);
            }

            if (!isValidImageFile(photoFile)) {
                logEntryService.log("ERROR", "Invalid file type for photo: " + fileName);
                throw new IllegalArgumentException("Invalid file type for photo: " + fileName);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            logEntryService.log("INFO", "Photo successfully stored at: " + filePath);

            return filePath.toString();
        } catch (IOException e) {
            logEntryService.log("ERROR", "Error storing photo file: " + fileName);
            throw new IllegalArgumentException("Could not store photo: " + fileName, e);
        }
    }

    private boolean isValidImageFile(MultipartFile photoFile) {
        String contentType = photoFile.getContentType();
        boolean isValid = contentType != null;
        logEntryService.log("DEBUG", "Validating photo file type: " + contentType + " - isValid: " + isValid);
        return isValid;
    }
}
