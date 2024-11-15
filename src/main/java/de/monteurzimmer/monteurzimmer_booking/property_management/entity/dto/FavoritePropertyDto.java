package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

@Data
public class FavoritePropertyDto {

    private Long propertyId;
    private Boolean isFavorite;
}
