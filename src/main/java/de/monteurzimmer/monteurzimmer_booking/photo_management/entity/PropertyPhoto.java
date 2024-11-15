package de.monteurzimmer.monteurzimmer_booking.photo_management.entity;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "property_photos")
public class PropertyPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    @Column(name = "is_primary")
    private Boolean isPrimary = false;
}

