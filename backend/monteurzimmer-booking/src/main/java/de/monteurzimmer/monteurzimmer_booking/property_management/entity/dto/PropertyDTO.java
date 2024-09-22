package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;
import org.modelmapper.spi.PropertyType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PropertyDTO {
    private Long propertyId;
    private Long adminId;
    private String propertyName;
    private String propertyType;
    private String description;
    private String location;
    private BigDecimal pricePerNight;
    private BigDecimal rating;
    private boolean isAvailable;
    private String country;
    private String city;
    private int roomCount;
    private int bedCount;
    private String neighborhood;
    private BigDecimal reviewScore;
    private int bathrooms;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private LocalDateTime createdAt;
    // Facilities flags
    private boolean wlan;
    private boolean tv;
    private boolean getrennteBetten;
    private boolean privatesBad;
    private boolean kochmoglichkeit;
    private boolean radio;
    private boolean handtucherInkl;
    private boolean zustellbettMoglich;
    private boolean bettwascheInkl;
    private boolean kuhlschrank;
    private boolean kaffeemaschine;
    private boolean mikrowelle;
    private boolean spulmaschine;
    private boolean wc;
    private boolean terrasse;
    private boolean wasserkocher;
    private boolean badewanne;
    private boolean garten;
    private boolean kochutensilien;
    private boolean waschmaschine;
    private boolean eigenstandigerCheckIn;
    private boolean raucher;
    private boolean ruhigeLage;
    private boolean guteVerkehrsanbindung;
    private boolean geschaefteInDerNahe;
}

