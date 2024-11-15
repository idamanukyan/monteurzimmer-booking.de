package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "related_properties")
public class RelatedProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long relatedId;
    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;
    @ManyToOne
    @JoinColumn(name = "related_property_id", nullable = false)
    private Property relatedProperty;
    private String comparisonCriteria;
    private Integer sortOrder;
    private String socialMediaLink;
}

