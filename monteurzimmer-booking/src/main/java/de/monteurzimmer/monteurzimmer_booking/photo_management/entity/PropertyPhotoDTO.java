package de.monteurzimmer.monteurzimmer_booking.photo_management.entity;

import lombok.Data;

@Data
public class PropertyPhotoDTO {
    private Long id;
    private Long propertyId;
    private String photoUrl;
    private boolean isPrimary;
}
