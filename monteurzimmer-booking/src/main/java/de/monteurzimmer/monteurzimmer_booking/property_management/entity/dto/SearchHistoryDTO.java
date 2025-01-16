package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SearchHistoryDTO {
    private Long searchId;
    private Long userId;
    private LocalDateTime searchTimestamp;
    private String city;
    private String propertyType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfPeople;
    private BigDecimal budgetRange;

    public Long getSearchId() {
        return searchId;
    }

    public void setSearchId(Long searchId) {
        this.searchId = searchId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getSearchTimestamp() {
        return searchTimestamp;
    }

    public void setSearchTimestamp(LocalDateTime searchTimestamp) {
        this.searchTimestamp = searchTimestamp;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public BigDecimal getBudgetRange() {
        return budgetRange;
    }

    public void setBudgetRange(BigDecimal budgetRange) {
        this.budgetRange = budgetRange;
    }
}

