package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NewsletterSubscriptionDTO {
    private String email;
    private String name;
    private String surname;
    private LocalDate birthDate;

}

