package de.monteurzimmer.monteurzimmer_booking.photo_management.controller;

import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhotoDTO;
import de.monteurzimmer.monteurzimmer_booking.photo_management.service.PropertyPhotoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * PropertyPhotoController is responsible for handling API requests related to
 * uploading and retrieving property photos. It interacts with the PropertyPhotoService
 * to perform CRUD operations on property photos and maps the data to DTOs.
 */
@RestController
@RequestMapping("/properties/photos")
public class PropertyPhotoController {

    private static final Logger logger = LoggerFactory.getLogger(PropertyPhotoController.class);

    @Autowired
    private PropertyPhotoService propertyPhotoService;

    /**
     * Upload a new photo for a property.
     *
     * @param propertyId The ID of the property for which the photo is being uploaded.
     * @param photoFile  The photo file to be uploaded.
     * @param isPrimary  Flag to indicate if the uploaded photo is the primary photo for the property.
     * @return ResponseEntity containing the uploaded PropertyPhotoDTO.
     */
    @PostMapping(value = "/upload/{propertyId}", consumes = "multipart/form-data")
    public ResponseEntity<PropertyPhotoDTO> uploadPhoto(@PathVariable Long propertyId,
                                                        @RequestParam("photoFile") MultipartFile photoFile,
                                                        @RequestParam("isPrimary") boolean isPrimary) {
        logger.info("Received request to upload photo for propertyId: {}", propertyId);

        try {
            // Store the uploaded photo
            String photoUrl = propertyPhotoService.storePhoto(photoFile);
            logger.info("Photo stored successfully, URL: {}", photoUrl);

            // Add photo to the property
            PropertyPhoto photo = propertyPhotoService.addPhotoToProperty(propertyId, photoUrl, isPrimary);
            logger.info("Photo added to property, propertyId: {}, photoId: {}", propertyId, photo.getId());

            // Map the PropertyPhoto entity to the DTO
            PropertyPhotoDTO photoDTO = new PropertyPhotoDTO();
            photoDTO.setId(photo.getId());
            photoDTO.setPropertyId(photo.getProperty().getId());
            photoDTO.setPhotoUrl(photo.getPhotoUrl());
            photoDTO.setPrimary(photo.getIsPrimary());

            return ResponseEntity.ok(photoDTO);
        } catch (Exception e) {
            logger.error("Error occurred while uploading photo for propertyId: {}", propertyId, e);
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Retrieve all photos for a specific property.
     *
     * @param propertyId The ID of the property for which to retrieve photos.
     * @return ResponseEntity containing the list of photo URLs.
     */
    @GetMapping("/{propertyId}")
    public ResponseEntity<List<String>> getPhotos(@PathVariable Long propertyId) {
        logger.info("Received request to get photos for propertyId: {}", propertyId);

        try {
            // Get the list of photo URLs for the given property ID
            List<String> photos = propertyPhotoService.getPhotosByPropertyId(propertyId);
            logger.info("Successfully retrieved {} photos for propertyId: {}", photos.size(), propertyId);

            return ResponseEntity.ok(photos);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving photos for propertyId: {}", propertyId, e);
            return ResponseEntity.status(500).body(null);
        }
    }
}
