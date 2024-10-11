package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.controller;

import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service.NewsletterSubscriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing newsletter subscription operations.
 * This class provides endpoints for subscribing and unsubscribing
 * users to the newsletter, as well as fetching all active subscriptions.
 * It handles HTTP requests for subscribing users, unsubscribing users
 * based on their email addresses, and retrieving a list of all subscribed user emails.
 */
@RestController
@RequestMapping("/api/newsletter")
public class NewsletterSubscriptionController {

    private static final Logger logger = LoggerFactory.getLogger(NewsletterSubscriptionController.class);

    private final NewsletterSubscriptionService subscriptionService;

    @Autowired
    public NewsletterSubscriptionController(NewsletterSubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody NewsletterSubscriptionDTO dto) {
        logger.debug("Subscribing user with email: {}", dto.getEmail());

        try {
            subscriptionService.subscribe(dto);
            logger.info("User subscribed successfully: {}", dto.getEmail());
            return new ResponseEntity<>("Subscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error during subscription: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestParam Long id) {
        logger.debug("Unsubscribing user with id: {}", id);

        try {
            subscriptionService.unsubscribe(id);
            logger.info("User unsubscribed successfully: {}", id);
            return new ResponseEntity<>("Unsubscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error during unsubscription: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/active-subscriptions")
    public ResponseEntity<List<String>> getAllSubscribedUserEmails() {
        logger.debug("Fetching all subscribed user emails.");

        List<String> subscriptions = subscriptionService.getAllSubscribedUserEmails();
        logger.info("Fetched {} active subscriptions.", subscriptions.size());
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/all-subscriptions")
    public ResponseEntity<List<NewsletterSubscription>> getAllSubscribedUser() {
        logger.debug("Fetching all subscribed user emails.");

        List<NewsletterSubscription> subscriptions = subscriptionService.getAllSubscribedUser();
        logger.info("Fetched {} active subscriptions.", subscriptions.size());
        return ResponseEntity.ok(subscriptions);
    }
}
