package de.monteurzimmer.monteurzimmer_booking.photo_management.controller;

import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PhotoUploadRequest;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhotoDTO;
import de.monteurzimmer.monteurzimmer_booking.photo_management.service.PropertyPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/properties/photos/{propertyId}")
public class PropertyPhotoController {

    @Autowired
    private PropertyPhotoService propertyPhotoService;

    @PostMapping
    public ResponseEntity<PropertyPhotoDTO> uploadPhoto(@PathVariable Long propertyId,
                                                     @RequestParam("photoFile") MultipartFile photoFile,
                                                     @RequestParam("isPrimary") boolean isPrimary) {

        String photoUrl = propertyPhotoService.storePhoto(photoFile);


        PropertyPhoto photo = propertyPhotoService.
                addPhotoToProperty(propertyId, photoUrl, isPrimary);
        // Map to DTO
        PropertyPhotoDTO photoDTO = new PropertyPhotoDTO();
        photoDTO.setId(photo.getId());
        photoDTO.setPropertyId(photo.getProperty().getPropertyId());
        photoDTO.setPhotoUrl(photo.getPhotoUrl());
        photoDTO.setPrimary(photo.getPrimary());

        return ResponseEntity.ok(photoDTO);
    }

    @GetMapping
    public ResponseEntity<List<PropertyPhoto>> getPhotos(@PathVariable Long propertyId) {
        List<PropertyPhoto> photos = propertyPhotoService.getPhotosByPropertyId(propertyId);
        return ResponseEntity.ok(photos);
    }
}

