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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public BigDecimal getFullPrice() {
        return fullPrice;
    }

    public void setFullPrice(BigDecimal fullPrice) {
        this.fullPrice = fullPrice;
    }

    public BigDecimal getPricePerBed() {
        return pricePerBed;
    }

    public void setPricePerBed(BigDecimal pricePerBed) {
        this.pricePerBed = pricePerBed;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
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

    public Integer getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(Integer roomCount) {
        this.roomCount = roomCount;
    }

    public Integer getBedCount() {
        return bedCount;
    }

    public void setBedCount(Integer bedCount) {
        this.bedCount = bedCount;
    }

    public Integer getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(Integer numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public String getSocialMediaLink() {
        return socialMediaLink;
    }

    public void setSocialMediaLink(String socialMediaLink) {
        this.socialMediaLink = socialMediaLink;
    }

    public Boolean getWifi() {
        return wifi;
    }

    public void setWifi(Boolean wifi) {
        this.wifi = wifi;
    }

    public Boolean getTv() {
        return tv;
    }

    public void setTv(Boolean tv) {
        this.tv = tv;
    }

    public Boolean getSeparateBeds() {
        return separateBeds;
    }

    public void setSeparateBeds(Boolean separateBeds) {
        this.separateBeds = separateBeds;
    }

    public Boolean getPrivateBath() {
        return privateBath;
    }

    public void setPrivateBath(Boolean privateBath) {
        this.privateBath = privateBath;
    }

    public Boolean getCookingFacilities() {
        return cookingFacilities;
    }

    public void setCookingFacilities(Boolean cookingFacilities) {
        this.cookingFacilities = cookingFacilities;
    }

    public Boolean getRadio() {
        return radio;
    }

    public void setRadio(Boolean radio) {
        this.radio = radio;
    }

    public Boolean getTowels() {
        return towels;
    }

    public void setTowels(Boolean towels) {
        this.towels = towels;
    }

    public Boolean getExtraBedPossible() {
        return extraBedPossible;
    }

    public void setExtraBedPossible(Boolean extraBedPossible) {
        this.extraBedPossible = extraBedPossible;
    }

    public Boolean getBedLinen() {
        return bedLinen;
    }

    public void setBedLinen(Boolean bedLinen) {
        this.bedLinen = bedLinen;
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

    public Boolean getWc() {
        return wc;
    }

    public void setWc(Boolean wc) {
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

    public Boolean getCookingUtensils() {
        return cookingUtensils;
    }

    public void setCookingUtensils(Boolean cookingUtensils) {
        this.cookingUtensils = cookingUtensils;
    }

    public Boolean getWashingMachine() {
        return washingMachine;
    }

    public void setWashingMachine(Boolean washingMachine) {
        this.washingMachine = washingMachine;
    }

    public Boolean getSelfCheckIn() {
        return selfCheckIn;
    }

    public void setSelfCheckIn(Boolean selfCheckIn) {
        this.selfCheckIn = selfCheckIn;
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

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
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

    public Boolean getFavorite() {
        return isFavorite;
    }

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }

    public List<PropertyPhoto> getPhotos() {
        return photos;
    }

    public void setPhotos(List<PropertyPhoto> photos) {
        this.photos = photos;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Long getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Long maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Long getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Long minPrice) {
        this.minPrice = minPrice;
    }
}
