package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyByLinkDto {
    String link;
    BigDecimal price;
}
