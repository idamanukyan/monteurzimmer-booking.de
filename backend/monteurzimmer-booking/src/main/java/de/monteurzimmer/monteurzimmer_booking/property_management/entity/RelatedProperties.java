package de.monteurzimmer.monteurzimmer_booking.property_management.entity;

import jakarta.persistence.*;

@Entity
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


    public Long getRelatedId() {
        return relatedId;
    }

    public void setRelatedId(Long relatedId) {
        this.relatedId = relatedId;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public Property getRelatedProperty() {
        return relatedProperty;
    }

    public void setRelatedProperty(Property relatedProperty) {
        this.relatedProperty = relatedProperty;
    }

    public String getComparisonCriteria() {
        return comparisonCriteria;
    }

    public void setComparisonCriteria(String comparisonCriteria) {
        this.comparisonCriteria = comparisonCriteria;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getSocialMediaLink() {
        return socialMediaLink;
    }

    public void setSocialMediaLink(String socialMediaLink) {
        this.socialMediaLink = socialMediaLink;
    }
}

