package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

@Data
public class FilterSearchPropertyDTO {

    private String city;
    private Integer numberOfGuests;
    private String distance; //suche in stadt, suche in der nahe, suche im umkreis, suche im ereweiteren umkreis

    //secondary popup filters
    private String propertyType;
    private String neighborhood;
    private Long minPrice;
    private Long maxPrice;
    private int roomCount; //Alle, Einzelzimmer, DoppelZimmer, Mehrbettzimmer, Ganze Unterkunft

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

    private String socialMediaLink;
}
