package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

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
    private Long propertyId;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = true)
    private User admin;

    @Column(nullable = false)
    private String propertyName;

    private String propertyType;

    @Lob
    private String description;

    private String location;

    @Column(name = "price_per_night", nullable = false)
    private BigDecimal price;

    private BigDecimal rating;
    private Boolean isAvailable = true;
    private String country;
    private String city;
    private String socialMediaLink;
    private Integer roomCount;
    private Integer bedCount;

    private Integer numberOfGuests;


    private Boolean wlan;
    private Boolean tv;
    private Boolean getrennteBetten;
    private Boolean privatesBad;
    private Boolean kochmoglichkeit;
    private Boolean radio;
    private Boolean handtucherInkl;
    private Boolean zustellbettMoglich;
    private Boolean bettwascheInkl;
    private Boolean kuehlschrank;
    private Boolean kaffeemaschine;
    private Boolean mikrowelle;
    private Boolean spuelmaschine;
    private Boolean wc;
    private Boolean terrasse;
    private Boolean wasserkocher;
    private Boolean badewanne;
    private Boolean garten;
    private Boolean kochutensilien;
    private Boolean waschmaschine;

    @Column(name = "eigenstandiger_check_in")
    private Boolean eigenstandigerCheckIn;

    private Boolean raucher;
    private Boolean ruhigeLage;
    private Boolean guteVerkehrsanbindung;
    private Boolean geschaefteInDerNahe;

    private String neighborhood;
    private BigDecimal reviewScore;
    private Integer bathrooms;
    private BigDecimal latitude;
    private BigDecimal longitude;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<PropertyPhoto> photos;

}

