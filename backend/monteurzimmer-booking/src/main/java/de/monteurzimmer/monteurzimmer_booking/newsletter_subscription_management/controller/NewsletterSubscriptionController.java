package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.controller;

import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service.NewsletterSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing newsletter subscription operations.
 * Provides endpoints for subscribing and unsubscribing users
 * to the newsletter, as well as fetching all active subscriptions.
 */
@RestController
@RequestMapping("/api/newsletter")
public class NewsletterSubscriptionController {

    private final NewsletterSubscriptionService subscriptionService;
    private final LogEntryService logEntryService;

    @Autowired
    public NewsletterSubscriptionController(NewsletterSubscriptionService subscriptionService, LogEntryService logEntryService) {
        this.subscriptionService = subscriptionService;
        this.logEntryService = logEntryService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody NewsletterSubscriptionDTO dto) {
        logEntryService.log("info", "Subscribing user with email: " + dto.getEmail());

        try {
            subscriptionService.subscribe(dto);
            logEntryService.log("info", "User subscribed successfully: " + dto.getEmail());
            return new ResponseEntity<>("Subscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            logEntryService.log("error", "Error during subscription: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestParam Long id) {
        logEntryService.log("info", "Unsubscribing user with id: " + id);

        try {
            subscriptionService.unsubscribe(id);
            logEntryService.log("info", "User unsubscribed successfully: " + id);
            return new ResponseEntity<>("Unsubscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            logEntryService.log("error", "Error during unsubscription: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/active-subscriptions")
    public ResponseEntity<List<String>> getAllSubscribedUserEmails() {
        logEntryService.log("info", "Fetching all subscribed user emails.");

        List<String> subscriptions = subscriptionService.getAllSubscribedUserEmails();
        logEntryService.log("info", "Fetched " + subscriptions.size() + " active subscriptions.");
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/all-subscriptions")
    public ResponseEntity<List<NewsletterSubscription>> getAllSubscribedUser() {
        logEntryService.log("info", "Fetching all subscribed users.");

        List<NewsletterSubscription> subscriptions = subscriptionService.getAllSubscribedUser();
        logEntryService.log("info", "Fetched " + subscriptions.size() + " active subscriptions.");
        return ResponseEntity.ok(subscriptions);
    }
}
