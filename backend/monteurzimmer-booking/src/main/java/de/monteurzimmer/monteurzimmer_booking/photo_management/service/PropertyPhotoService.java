package de.monteurzimmer.monteurzimmer_booking.photo_management.service;

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

@Service
public class PropertyPhotoService {

    @Autowired
    private PropertyPhotoRepository propertyPhotoRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public PropertyPhoto addPhotoToProperty(Long propertyId, String photoUrl, boolean isPrimary) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property not found with id: " + propertyId));

        PropertyPhoto photo = new PropertyPhoto();
        photo.setProperty(property);
        photo.setPhotoUrl(photoUrl);
        photo.setUploadedAt(LocalDateTime.now());
        photo.setPrimary(isPrimary);
        return propertyPhotoRepository.save(photo);
    }

    public List<PropertyPhoto> getPhotosByPropertyId(Long propertyId) {
        return propertyPhotoRepository.findByPropertyPropertyId(propertyId);
    }

    public String storePhoto(MultipartFile photoFile) {
        String uploadDir = "frontend/project/src/assets/storage/upload/property-photos";

        String fileName = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return filePath.toString();
        } catch (IOException e) {
            throw new IllegalArgumentException("Could not store photo: " + fileName, e);
        }
    }
}

