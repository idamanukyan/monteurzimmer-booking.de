package de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyByLinkDto {
    String link;
    BigDecimal price;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
