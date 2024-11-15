package de.monteurzimmer.monteurzimmer_booking.city_management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @Column(name = "photo_url")
    private String photo;

    private Double longitude;
    private Double latitude;


    public City() {
    }

    public City(Long id, String name, Boolean isFavorite) {
        this.id = id;
        this.name = name;
        this.isFavorite = isFavorite;
    }

    public City(String name) {
        this.name = name;
    }
}

