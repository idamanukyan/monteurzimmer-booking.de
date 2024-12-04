package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;
    private String propertyName;
    private String propertyType;
    @Lob
    private String description;
    private String address;
    @Column(name = "price_per_night")
    private BigDecimal pricePerNight;
    @Column(name = "full_price")
    private BigDecimal fullPrice;
    @Column(name = "price_per_bed")
    private BigDecimal pricePerBed;
    private BigDecimal rating;
    private Boolean isAvailable;
    private String country;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id")
    private City city;
    private Integer roomCount;
    private Integer bedCount;
    @Column(name = "number_of_guests")
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
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "is_favorite")
    private Boolean isFavorite;
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<PropertyPhoto> photos;
    private String mainPhoto;
}

