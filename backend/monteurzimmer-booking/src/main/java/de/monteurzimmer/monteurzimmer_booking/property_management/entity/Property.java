package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
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

    @Column(nullable = false)
    private BigDecimal pricePerNight;

    private BigDecimal rating;
    private Boolean isAvailable = true;
    private String country;
    private String city;
    private Integer roomCount;
    private Integer bedCount;

    private Boolean wlan;
    private Boolean tv;
    private Boolean getrennteBetten;
    private Boolean privatesBad;
    private Boolean kochmoglichkeit;
    private Boolean radio;
    private Boolean handtucherInkl;
    private Boolean zustellbettMoglich;
    private Boolean bettwascheInkl;
    private Boolean kuhlschrank;
    private Boolean kaffeemaschine;
    private Boolean mikrowelle;
    private Boolean spulmaschine;
    private Boolean wc;
    private Boolean terrasse;
    private Boolean wasserkocher;
    private Boolean badewanne;
    private Boolean garten;
    private Boolean kochutensilien;
    private Boolean waschmaschine;
    private Boolean eigenstandigerCheckIn;
    private Boolean raucher;
    private Boolean ruhigeLage;
    private Boolean guteVekehrsanbindung;
    private Boolean geschaefteInDerNahe;

    private String neighborhood;
    private BigDecimal reviewScore;
    private Integer bathrooms;
    private BigDecimal latitude;
    private BigDecimal longitude;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
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

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
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

    public Boolean getWlan() {
        return wlan;
    }

    public void setWlan(Boolean wlan) {
        this.wlan = wlan;
    }

    public Boolean getTv() {
        return tv;
    }

    public void setTv(Boolean tv) {
        this.tv = tv;
    }

    public Boolean getGetrennteBetten() {
        return getrennteBetten;
    }

    public void setGetrennteBetten(Boolean getrennteBetten) {
        this.getrennteBetten = getrennteBetten;
    }

    public Boolean getPrivatesBad() {
        return privatesBad;
    }

    public void setPrivatesBad(Boolean privatesBad) {
        this.privatesBad = privatesBad;
    }

    public Boolean getKochmoglichkeit() {
        return kochmoglichkeit;
    }

    public void setKochmoglichkeit(Boolean kochmoglichkeit) {
        this.kochmoglichkeit = kochmoglichkeit;
    }

    public Boolean getRadio() {
        return radio;
    }

    public void setRadio(Boolean radio) {
        this.radio = radio;
    }

    public Boolean getHandtucherInkl() {
        return handtucherInkl;
    }

    public void setHandtucherInkl(Boolean handtucherInkl) {
        this.handtucherInkl = handtucherInkl;
    }

    public Boolean getZustellbettMoglich() {
        return zustellbettMoglich;
    }

    public void setZustellbettMoglich(Boolean zustellbettMoglich) {
        this.zustellbettMoglich = zustellbettMoglich;
    }

    public Boolean getBettwascheInkl() {
        return bettwascheInkl;
    }

    public void setBettwascheInkl(Boolean bettwascheInkl) {
        this.bettwascheInkl = bettwascheInkl;
    }

    public Boolean getKuhlschrank() {
        return kuhlschrank;
    }

    public void setKuhlschrank(Boolean kuhlschrank) {
        this.kuhlschrank = kuhlschrank;
    }

    public Boolean getKaffeemaschine() {
        return kaffeemaschine;
    }

    public void setKaffeemaschine(Boolean kaffeemaschine) {
        this.kaffeemaschine = kaffeemaschine;
    }

    public Boolean getMikrowelle() {
        return mikrowelle;
    }

    public void setMikrowelle(Boolean mikrowelle) {
        this.mikrowelle = mikrowelle;
    }

    public Boolean getSpulmaschine() {
        return spulmaschine;
    }

    public void setSpulmaschine(Boolean spulmaschine) {
        this.spulmaschine = spulmaschine;
    }

    public Boolean getWc() {
        return wc;
    }

    public void setWc(Boolean wc) {
        this.wc = wc;
    }

    public Boolean getTerrasse() {
        return terrasse;
    }

    public void setTerrasse(Boolean terrasse) {
        this.terrasse = terrasse;
    }

    public Boolean getWasserkocher() {
        return wasserkocher;
    }

    public void setWasserkocher(Boolean wasserkocher) {
        this.wasserkocher = wasserkocher;
    }

    public Boolean getBadewanne() {
        return badewanne;
    }

    public void setBadewanne(Boolean badewanne) {
        this.badewanne = badewanne;
    }

    public Boolean getGarten() {
        return garten;
    }

    public void setGarten(Boolean garten) {
        this.garten = garten;
    }

    public Boolean getKochutensilien() {
        return kochutensilien;
    }

    public void setKochutensilien(Boolean kochutensilien) {
        this.kochutensilien = kochutensilien;
    }

    public Boolean getWaschmaschine() {
        return waschmaschine;
    }

    public void setWaschmaschine(Boolean waschmaschine) {
        this.waschmaschine = waschmaschine;
    }

    public Boolean getEigenstandigerCheckIn() {
        return eigenstandigerCheckIn;
    }

    public void setEigenstandigerCheckIn(Boolean eigenstandigerCheckIn) {
        this.eigenstandigerCheckIn = eigenstandigerCheckIn;
    }

    public Boolean getRaucher() {
        return raucher;
    }

    public void setRaucher(Boolean raucher) {
        this.raucher = raucher;
    }

    public Boolean getRuhigeLage() {
        return ruhigeLage;
    }

    public void setRuhigeLage(Boolean ruhigeLage) {
        this.ruhigeLage = ruhigeLage;
    }

    public Boolean getGuteVekehrsanbindung() {
        return guteVekehrsanbindung;
    }

    public void setGuteVekehrsanbindung(Boolean guteVekehrsanbindung) {
        this.guteVekehrsanbindung = guteVekehrsanbindung;
    }

    public Boolean getGeschaefteInDerNahe() {
        return geschaefteInDerNahe;
    }

    public void setGeschaefteInDerNahe(Boolean geschaefteInDerNahe) {
        this.geschaefteInDerNahe = geschaefteInDerNahe;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

