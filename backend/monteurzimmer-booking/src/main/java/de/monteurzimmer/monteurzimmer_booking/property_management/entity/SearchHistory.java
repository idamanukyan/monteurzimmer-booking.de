package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "search_history")
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(name = "search_timestamp", updatable = false)
    private LocalDateTime searchTimestamp = LocalDateTime.now();
    private String country;
    private String city;
    private String propertyType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfPeople;
    private BigDecimal budgetRange;

}

