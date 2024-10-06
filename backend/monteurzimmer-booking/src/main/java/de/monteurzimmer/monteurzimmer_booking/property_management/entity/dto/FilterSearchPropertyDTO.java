package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class FilterSearchPropertyDTO {
    private String propertyName;
    private String propertyType;
    private String description;
    private String address;
    private BigDecimal pricePerNight;
    private BigDecimal fullPrice;
    private BigDecimal pricePerBed;
    private BigDecimal rating;
    private Boolean isAvailable;
    private String country;
    private City city;
    private Integer roomCount; //Alle, Einzelzimmer, DoppelZimmer, Mehrbettzimmer, Ganze Unterkunft
    private Integer bedCount;
    private Integer numberOfGuests;
    private String socialMediaLink;
    private Boolean wifi;
    private Boolean tv;
    private Boolean separateBeds;
    private Boolean privateBath;
    private Boolean cookingFacilities;
    private Boolean radio;
    private Boolean towels;
    private Boolean extraBedPossible;
    private Boolean bedLinen;
    private Boolean fridge;
    private Boolean coffeeMachine;
    private Boolean microwave;
    private Boolean dishwasher;
    private Boolean wc;
    private Boolean terrace;
    private Boolean kettle;
    private Boolean bathtub;
    private Boolean garden;
    private Boolean cookingUtensils;
    private Boolean washingMachine;
    private Boolean selfCheckIn;
    private Boolean smoking;
    private Boolean quietLocation;
    private Boolean goodTransportation;
    private Boolean shopsNearby;
    private String neighborhood;
    private Integer bathrooms;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Boolean isFavorite;
    private List<PropertyPhoto> photos;

    private Integer distance;

    //for price range search
    private Long maxPrice;
    private Long minPrice;
}
