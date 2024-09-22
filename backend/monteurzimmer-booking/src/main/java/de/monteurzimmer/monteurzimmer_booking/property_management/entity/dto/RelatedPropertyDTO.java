package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

@Data
public class RelatedPropertyDTO {
    private Long relatedId;
    private Long propertyId;
    private Long relatedPropertyId;
    private String comparisonCriteria;
    private int sortOrder;
}

