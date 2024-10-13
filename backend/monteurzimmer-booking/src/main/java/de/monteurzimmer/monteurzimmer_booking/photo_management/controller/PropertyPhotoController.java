package de.monteurzimmer.monteurzimmer_booking.photo_management.controller;

import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhotoDTO;
import de.monteurzimmer.monteurzimmer_booking.photo_management.service.PropertyPhotoService;
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
@RequestMapping("/api/properties/photos")
public class PropertyPhotoController {

    @Autowired
    private PropertyPhotoService propertyPhotoService;

    @Autowired
    private LogEntryService logEntryService;

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
        logEntryService.log("info", "Received request to upload photo for propertyId: " + propertyId);

        try {
            // Store the uploaded photo
            String photoUrl = propertyPhotoService.storePhoto(photoFile);
            logEntryService.log("info", "Photo stored successfully, URL: " + photoUrl);

            // Add photo to the property
            PropertyPhoto photo = propertyPhotoService.addPhotoToProperty(propertyId, photoUrl, isPrimary);
            logEntryService.log("info", "Photo added to property, propertyId: " + propertyId + ", photoId: " + photo.getId());

            // Map the PropertyPhoto entity to the DTO
            PropertyPhotoDTO photoDTO = new PropertyPhotoDTO();
            photoDTO.setId(photo.getId());
            photoDTO.setPropertyId(photo.getProperty().getId());
            photoDTO.setPhotoUrl(photo.getPhotoUrl());
            photoDTO.setPrimary(photo.getIsPrimary());

            return ResponseEntity.ok(photoDTO);
        } catch (Exception e) {
            logEntryService.log("error", "Error occurred while uploading photo for propertyId: " + propertyId + e);
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
        logEntryService.log("info", "Received request to get photos for propertyId: " + propertyId);

        try {
            // Get the list of photo URLs for the given property ID
            List<String> photos = propertyPhotoService.getPhotosByPropertyId(propertyId);
            logEntryService.log("info", "Successfully retrieved " + photos.size() + " photos for propertyId: " + propertyId);

            return ResponseEntity.ok(photos);
        } catch (Exception e) {
            logEntryService.log("error", "Error occurred while retrieving photos for propertyId: " + propertyId + e);
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Retrieve the primary photo for a specific property.
     *
     * @param propertyId The ID of the property for which to retrieve the primary photo.
     * @return ResponseEntity containing the primary photo URL.
     */
    @GetMapping("/primary/{propertyId}")
    public ResponseEntity<String> getPrimaryPhoto(@PathVariable Long propertyId) {
        logEntryService.log("info", "Received request to get primary photo for propertyId: " + propertyId);

        try {
            // Get the primary photo for the given property ID
            String photo = propertyPhotoService.getPrimaryPhoto(propertyId);
            logEntryService.log("info", "Successfully retrieved primary photo for propertyId: " + propertyId);

            return ResponseEntity.ok(photo);
        } catch (Exception e) {
            logEntryService.log("error", "Error occurred while retrieving primary photo for propertyId: " + propertyId + e.toString());
            return ResponseEntity.status(500).body(null);
        }
    }
}
