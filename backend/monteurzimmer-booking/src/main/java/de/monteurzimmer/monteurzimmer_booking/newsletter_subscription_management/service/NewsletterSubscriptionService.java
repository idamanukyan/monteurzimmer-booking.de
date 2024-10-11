package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service;

import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.repository.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterSubscriptionService {

    private final NewsletterSubscriptionRepository repository;
    private final LogEntryService logEntryService;

    @Autowired
    public NewsletterSubscriptionService(NewsletterSubscriptionRepository repository, LogEntryService logEntryService) {
        this.repository = repository;
        this.logEntryService = logEntryService;
    }

    public void subscribe(NewsletterSubscriptionDTO dto) throws Exception {
        logEntryService.log("debug", "Attempting to subscribe email: " + dto.getEmail());

        // Validate input
        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            logEntryService.log("error", "Failed to subscribe: Email is null or empty.");
            throw new IllegalArgumentException("Email must not be null or empty.");
        }

        Optional<NewsletterSubscription> existingSubscription = repository.findByEmail(dto.getEmail());
        if (existingSubscription.isPresent()) {
            if (existingSubscription.get().getActive()) {
                logEntryService.log("warn", "Subscription attempt for already active email: " + dto.getEmail());
                throw new Exception("Email is already subscribed!");
            } else {
                logEntryService.log("info", "Reactivating previously inactive subscription for email: " + dto.getEmail());
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
        logEntryService.log("info", "Successfully subscribed email: " + dto.getEmail());
    }

    public void unsubscribe(Long id) throws Exception {
        logEntryService.log("debug", "Attempting to unsubscribe email with id: " + id);

        // Validate input
        if (id == null) {
            logEntryService.log("error", "Failed to unsubscribe: ID is null or empty.");
            throw new IllegalArgumentException("ID must not be null or empty.");
        }

        Optional<NewsletterSubscription> subscription = repository.findById(id);
        if (subscription.isPresent()) {
            NewsletterSubscription subs = subscription.get();
            if (!subs.getActive()) {
                logEntryService.log("warn", "Attempt to unsubscribe already inactive email with id: " + id);
                throw new Exception("Email is not currently subscribed.");
            }
            subs.setActive(false);
            repository.save(subs);
            logEntryService.log("info", "Successfully unsubscribed email with id: " + id);
        } else {
            logEntryService.log("error", "Unsubscribe attempt failed: Subscription not found for id: " + id);
            throw new Exception("Subscription not found!");
        }
    }

    public List<String> getAllSubscribedUserEmails() {
        logEntryService.log("info", "Fetching all active subscriptions.");
        List<String> emails = repository.findAllActiveEmails();
        logEntryService.log("info", "Fetched " + emails.size() + " active subscriptions.");
        return emails;
    }

    public List<NewsletterSubscription> getAllSubscribedUser() {
        logEntryService.log("info", "Fetching all active subscriptions.");
        List<NewsletterSubscription> users = repository.findAll();
        logEntryService.log("info", "Fetched " + users.size() + " active subscriptions.");
        return users;
    }
}
