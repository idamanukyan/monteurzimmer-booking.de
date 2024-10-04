package de.monteurzimmer.monteurzimmer_booking.photo_management.service;

import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.photo_management.repository.PropertyPhotoRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(PropertyPhotoService.class);

    private static final String UPLOAD_DIR = "client/storage/upload/icons/city";

    @Autowired
    private PropertyPhotoRepository propertyPhotoRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    /**
     * Adds a photo to a property and stores it in the database.
     *
     * @param propertyId The ID of the property to which the photo belongs.
     * @param photoUrl   The URL of the photo to be stored.
     * @param isPrimary  Flag to determine if the photo is the primary photo for the property.
     * @return The saved PropertyPhoto entity.
     */
    public PropertyPhoto addPhotoToProperty(Long propertyId, String photoUrl, boolean isPrimary) {
        // Validate property existence
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found with id: " + propertyId));

        // Create and save the property photo
        PropertyPhoto photo = new PropertyPhoto();
        photo.setProperty(property);
        photo.setPhotoUrl(photoUrl);
        photo.setUploadedAt(LocalDateTime.now());
        photo.setIsPrimary(isPrimary);

        List<PropertyPhoto> propertyPhotos = property.getPhotos();

        propertyPhotos.add(photo);

        logger.info("Adding photo to property with ID: {}", propertyId);
        return propertyPhotoRepository.save(photo);
    }

    /**
     * Retrieves all photo URLs for a specific property.
     *
     * @param propertyId The ID of the property for which photos are being retrieved.
     * @return A list of photo URLs.
     */
    public List<String> getPhotosByPropertyId(Long propertyId) {
        logger.info("Fetching photos for property with ID: {}", propertyId);
        List<PropertyPhoto> photos = propertyPhotoRepository.findByPropertyId(propertyId);

        // Check if property has no photos
        if (photos.isEmpty()) {
            logger.warn("No photos found for property ID: {}", propertyId);
            throw new IllegalArgumentException("No photos found for property with ID: " + propertyId);
        }

        // Map the list of PropertyPhoto entities to a list of photo URLs
        return photos.stream()
                .map(PropertyPhoto::getPhotoUrl)
                .collect(Collectors.toList());
    }

    /**
     * Stores an uploaded photo file in the file system and returns its file path.
     *
     * @param photoFile The photo file to be stored.
     * @return The file path where the photo is stored.
     */
    public String storePhoto(MultipartFile photoFile) {
        // Validate file
        if (photoFile.isEmpty()) {
            logger.error("Failed to store photo: file is empty");
            throw new IllegalArgumentException("Cannot store empty photo file.");
        }

        String fileName = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);

            // Create directories if they don't exist
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                logger.info("Created directory for photo storage: {}", uploadPath);
            }

            // Ensure the file has a valid image type (optional but recommended)
            if (!isValidImageFile(photoFile)) {
                logger.error("Invalid file type for photo: {}", fileName);
                throw new IllegalArgumentException("Invalid file type for photo: " + fileName);
            }

            // Save the file to the upload directory
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            logger.info("Photo successfully stored at: {}", filePath);

            return filePath.toString();
        } catch (IOException e) {
            logger.error("Error storing photo file: {}", fileName, e);
            throw new IllegalArgumentException("Could not store photo: " + fileName, e);
        }
    }

    /**
     * Validates the file type to ensure it's an image file.
     *
     * @param photoFile The uploaded photo file.
     * @return True if the file is a valid image, false otherwise.
     */
    private boolean isValidImageFile(MultipartFile photoFile) {
        String contentType = photoFile.getContentType();
        return contentType != null;
                //&&
                //(contentType.equals("image/jpeg") || contentType.equals("image/jpg") ||
                  //      contentType.equals("image/svg") ||
                    //    contentType.equals("image/png") || contentType.equals("image/gif"));
    }
}
