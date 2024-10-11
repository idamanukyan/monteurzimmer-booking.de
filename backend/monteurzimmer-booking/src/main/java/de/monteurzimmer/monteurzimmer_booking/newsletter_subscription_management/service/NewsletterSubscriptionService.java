package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service;

import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.repository.NewsletterSubscriptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterSubscriptionService {

    private static final Logger logger = LoggerFactory.getLogger(NewsletterSubscriptionService.class);

    private final NewsletterSubscriptionRepository repository;

    @Autowired
    public NewsletterSubscriptionService(NewsletterSubscriptionRepository repository) {
        this.repository = repository;
    }

    public void subscribe(NewsletterSubscriptionDTO dto) throws Exception {
        logger.debug("Attempting to subscribe email: {}", dto.getEmail());

        // Validate input
        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            logger.error("Failed to subscribe: Email is null or empty.");
            throw new IllegalArgumentException("Email must not be null or empty.");
        }

        Optional<NewsletterSubscription> existingSubscription = repository.findByEmail(dto.getEmail());
        if (existingSubscription.isPresent()) {
            if (existingSubscription.get().getActive()) {
                logger.warn("Subscription attempt for already active email: {}", dto.getEmail());
                throw new Exception("Email is already subscribed!");
            } else {
                logger.info("Reactivating previously inactive subscription for email: {}", dto.getEmail());
                NewsletterSubscription subscription = existingSubscription.get();
                subscription.setActive(true);
                repository.save(subscription);
                return; // Exit if reactivating the subscription
            }
        }

        // Create a new subscription
        NewsletterSubscription subscription = new NewsletterSubscription();
        subscription.setEmail(dto.getEmail());
        subscription.setName(dto.getName());
        subscription.setSurname(dto.getSurname());
        subscription.setBirthDate(dto.getBirthDate());

        repository.save(subscription);
        logger.info("Successfully subscribed email: {}", dto.getEmail());
    }

    public void unsubscribe(Long id) throws Exception {
        logger.debug("Attempting to unsubscribe email: {}", id);

        // Validate input
        if (id == null) {
            logger.error("Failed to unsubscribe: ID is null or empty.");
            throw new IllegalArgumentException("ID must not be null or empty.");
        }

        Optional<NewsletterSubscription> subscription = repository.findById(id);
        if (subscription.isPresent()) {
            NewsletterSubscription subs = subscription.get();
            if (!subs.getActive()) {
                logger.warn("Attempt to unsubscribe already inactive email: {}", id);
                throw new Exception("Email is not currently subscribed.");
            }
            subs.setActive(false);
            repository.save(subs);
            logger.info("Successfully unsubscribed email: {}", id);
        } else {
            logger.error("Unsubscribe attempt failed: Subscription not found for email: {}", id);
            throw new Exception("Subscription not found!");
        }
    }

    public List<String> getAllSubscribedUserEmails() {
        logger.debug("Fetching all active subscriptions.");
        List<String> emails = repository.findAllActiveEmails();
        logger.info("Fetched {} active subscriptions.", emails.size());
        return emails;
    }

    public List<NewsletterSubscription> getAllSubscribedUser() {
        logger.debug("Fetching all active subscriptions.");
        List<NewsletterSubscription> users = repository.findAll();
        logger.info("Fetched {} active subscriptions.", users.size());
        return users;
    }


}
