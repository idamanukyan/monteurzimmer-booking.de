package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PropertyDTO {
    private Long id;
    private Long adminId;
    private String propertyName;
    private String propertyType;
    private String description;
    private String location;
    private BigDecimal price;
    private BigDecimal rating;
    private boolean isAvailable;
    private String country;
    private City city;
    private int roomCount;
    private int bedCount;
    private Integer numberOfGuests;
    private String neighborhood;
    private BigDecimal reviewScore;
    private int bathrooms;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private LocalDateTime createdAt;
    // Facilities flags
    private boolean wifi;
    private boolean tv;
    private boolean separateBeds;
    private Boolean privateBath;
    private String address;
    private boolean cookingFacilities;
    private boolean radio;
    private boolean towels;
    private Boolean fridge;
    private Boolean coffeeMachine;
    private Boolean microwave;
    private Boolean dishwasher;
    private boolean wc;
    private Boolean terrace;
    private Boolean kettle;
    private Boolean bathtub;
    private Boolean garden;
    private boolean cookingUtensils;
    private Boolean washingMachine;
    private Boolean smoking;
    private Boolean quietLocation;
    private Boolean goodTransportation;
    private Boolean shopsNearby;
    private List<PropertyPhoto> photos;
    private String socialMediaLink;
    private Boolean isFavorite;


}

