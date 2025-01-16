package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

@Data
public class FavoritePropertyDto {

    private Long propertyId;
    private Boolean isFavorite;

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public Boolean getFavorite() {
        return isFavorite;
    }

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }
}
