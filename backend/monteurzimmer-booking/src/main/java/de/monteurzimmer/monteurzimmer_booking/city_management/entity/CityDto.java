package de.monteurzimmer.monteurzimmer_booking.city_management.entity;

import lombok.Data;

@Data
public class CityDto {

    private Long id;

    private String name;

    private Boolean isFavorite;

    private String photo;
}
