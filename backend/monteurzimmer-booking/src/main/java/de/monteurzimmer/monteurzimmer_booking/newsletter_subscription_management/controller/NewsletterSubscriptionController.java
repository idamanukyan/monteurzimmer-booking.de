package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.controller;

import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service.NewsletterSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterSubscriptionController {

    @Autowired
    private NewsletterSubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestBody NewsletterSubscriptionDTO dto) {
        try {
            subscriptionService.subscribe(dto);
            return new ResponseEntity<>("Subscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestParam String email) {
        try {
            subscriptionService.unsubscribe(email);
            return new ResponseEntity<>("Unsubscribed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/active-subscriptions")
    public ResponseEntity<List<String>> getAllSubscribedUserEmails() {

        List<String> subscriptions = subscriptionService.getAllSubscribedUserEmails();
        return ResponseEntity.ok(subscriptions);
    }
}

