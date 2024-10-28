package de.monteurzimmer.monteurzimmer_booking.log.search_log;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class SearchLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private Double distance;
    private String otherFilters;
    private String ipAddress;
    private LocalDateTime timestamp;

    @Column(length = 1000)
    private String searchParams;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public String getOtherFilters() {
        return otherFilters;
    }

    public void setOtherFilters(String otherFilters) {
        this.otherFilters = otherFilters;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getSearchParams() {
        return searchParams;
    }

    public void setSearchParams(String searchParams) {
        this.searchParams = searchParams;
    }
}
