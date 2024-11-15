package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.repository;

import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Long> {
    Optional<NewsletterSubscription> findByEmail(String email);

    @Query("SELECT ns.email FROM NewsletterSubscription ns WHERE ns.isActive = true")
    List<String> findAllActiveEmails();
}

