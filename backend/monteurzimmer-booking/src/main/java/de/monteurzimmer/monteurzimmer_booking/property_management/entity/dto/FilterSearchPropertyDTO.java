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

    @Override
    public String toString() {
        return "FilterSearchPropertyDTO{" +
                "propertyName='" + propertyName + '\'' +
                ", propertyType='" + propertyType + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", pricePerNight=" + pricePerNight +
                ", fullPrice=" + fullPrice +
                ", pricePerBed=" + pricePerBed +
                ", rating=" + rating +
                ", isAvailable=" + isAvailable +
                ", country='" + country + '\'' +
                ", city=" + city +
                ", roomCount=" + roomCount +
                ", bedCount=" + bedCount +
                ", numberOfGuests=" + numberOfGuests +
                ", socialMediaLink='" + socialMediaLink + '\'' +
                ", wifi=" + wifi +
                ", tv=" + tv +
                ", separateBeds=" + separateBeds +
                ", privateBath=" + privateBath +
                ", cookingFacilities=" + cookingFacilities +
                ", radio=" + radio +
                ", towels=" + towels +
                ", extraBedPossible=" + extraBedPossible +
                ", bedLinen=" + bedLinen +
                ", fridge=" + fridge +
                ", coffeeMachine=" + coffeeMachine +
                ", microwave=" + microwave +
                ", dishwasher=" + dishwasher +
                ", wc=" + wc +
                ", terrace=" + terrace +
                ", kettle=" + kettle +
                ", bathtub=" + bathtub +
                ", garden=" + garden +
                ", cookingUtensils=" + cookingUtensils +
                ", washingMachine=" + washingMachine +
                ", selfCheckIn=" + selfCheckIn +
                ", smoking=" + smoking +
                ", quietLocation=" + quietLocation +
                ", goodTransportation=" + goodTransportation +
                ", shopsNearby=" + shopsNearby +
                ", neighborhood='" + neighborhood + '\'' +
                ", bathrooms=" + bathrooms +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", isFavorite=" + isFavorite +
                ", photos=" + photos +
                ", distance=" + distance +
                ", maxPrice=" + maxPrice +
                ", minPrice=" + minPrice +
                '}';
    }
}
