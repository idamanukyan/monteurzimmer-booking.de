package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SearchHistoryDTO {
    private Long searchId;
    private Long userId; //can be null, if null ip
    private LocalDateTime searchTimestamp;
    private String city;
    private String propertyType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numberOfPeople;
    private BigDecimal budgetRange;
}

