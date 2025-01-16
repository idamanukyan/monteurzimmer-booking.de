package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

@Data
public class RelatedPropertyDTO {
    private Long relatedId;
    private Long propertyId;
    private Long relatedPropertyId;
    private String comparisonCriteria;
    private int sortOrder;

    private String socialMediaLink;

    public Long getRelatedId() {
        return relatedId;
    }

    public void setRelatedId(Long relatedId) {
        this.relatedId = relatedId;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public Long getRelatedPropertyId() {
        return relatedPropertyId;
    }

    public void setRelatedPropertyId(Long relatedPropertyId) {
        this.relatedPropertyId = relatedPropertyId;
    }

    public String getComparisonCriteria() {
        return comparisonCriteria;
    }

    public void setComparisonCriteria(String comparisonCriteria) {
        this.comparisonCriteria = comparisonCriteria;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getSocialMediaLink() {
        return socialMediaLink;
    }

    public void setSocialMediaLink(String socialMediaLink) {
        this.socialMediaLink = socialMediaLink;
    }
}

