package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public int getBedCount() {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    public Integer getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(Integer numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public BigDecimal getReviewScore() {
        return reviewScore;
    }

    public void setReviewScore(BigDecimal reviewScore) {
        this.reviewScore = reviewScore;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isWifi() {
        return wifi;
    }

    public void setWifi(boolean wifi) {
        this.wifi = wifi;
    }

    public boolean isTv() {
        return tv;
    }

    public void setTv(boolean tv) {
        this.tv = tv;
    }

    public boolean isSeparateBeds() {
        return separateBeds;
    }

    public void setSeparateBeds(boolean separateBeds) {
        this.separateBeds = separateBeds;
    }

    public Boolean getPrivateBath() {
        return privateBath;
    }

    public void setPrivateBath(Boolean privateBath) {
        this.privateBath = privateBath;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isCookingFacilities() {
        return cookingFacilities;
    }

    public void setCookingFacilities(boolean cookingFacilities) {
        this.cookingFacilities = cookingFacilities;
    }

    public boolean isRadio() {
        return radio;
    }

    public void setRadio(boolean radio) {
        this.radio = radio;
    }

    public boolean isTowels() {
        return towels;
    }

    public void setTowels(boolean towels) {
        this.towels = towels;
    }

    public Boolean getFridge() {
        return fridge;
    }

    public void setFridge(Boolean fridge) {
        this.fridge = fridge;
    }

    public Boolean getCoffeeMachine() {
        return coffeeMachine;
    }

    public void setCoffeeMachine(Boolean coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    public Boolean getMicrowave() {
        return microwave;
    }

    public void setMicrowave(Boolean microwave) {
        this.microwave = microwave;
    }

    public Boolean getDishwasher() {
        return dishwasher;
    }

    public void setDishwasher(Boolean dishwasher) {
        this.dishwasher = dishwasher;
    }

    public boolean isWc() {
        return wc;
    }

    public void setWc(boolean wc) {
        this.wc = wc;
    }

    public Boolean getTerrace() {
        return terrace;
    }

    public void setTerrace(Boolean terrace) {
        this.terrace = terrace;
    }

    public Boolean getKettle() {
        return kettle;
    }

    public void setKettle(Boolean kettle) {
        this.kettle = kettle;
    }

    public Boolean getBathtub() {
        return bathtub;
    }

    public void setBathtub(Boolean bathtub) {
        this.bathtub = bathtub;
    }

    public Boolean getGarden() {
        return garden;
    }

    public void setGarden(Boolean garden) {
        this.garden = garden;
    }

    public boolean isCookingUtensils() {
        return cookingUtensils;
    }

    public void setCookingUtensils(boolean cookingUtensils) {
        this.cookingUtensils = cookingUtensils;
    }

    public Boolean getWashingMachine() {
        return washingMachine;
    }

    public void setWashingMachine(Boolean washingMachine) {
        this.washingMachine = washingMachine;
    }

    public Boolean getSmoking() {
        return smoking;
    }

    public void setSmoking(Boolean smoking) {
        this.smoking = smoking;
    }

    public Boolean getQuietLocation() {
        return quietLocation;
    }

    public void setQuietLocation(Boolean quietLocation) {
        this.quietLocation = quietLocation;
    }

    public Boolean getGoodTransportation() {
        return goodTransportation;
    }

    public void setGoodTransportation(Boolean goodTransportation) {
        this.goodTransportation = goodTransportation;
    }

    public Boolean getShopsNearby() {
        return shopsNearby;
    }

    public void setShopsNearby(Boolean shopsNearby) {
        this.shopsNearby = shopsNearby;
    }

    public List<PropertyPhoto> getPhotos() {
        return photos;
    }

    public void setPhotos(List<PropertyPhoto> photos) {
        this.photos = photos;
    }

    public String getSocialMediaLink() {
        return socialMediaLink;
    }

    public void setSocialMediaLink(String socialMediaLink) {
        this.socialMediaLink = socialMediaLink;
    }

    public Boolean getFavorite() {
        return isFavorite;
    }

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }
}

