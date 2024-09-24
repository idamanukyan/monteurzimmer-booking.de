package de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.service;

import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscription;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.entity.NewsletterSubscriptionDTO;
import de.monteurzimmer.monteurzimmer_booking.newsletter_subscription_management.repository.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterSubscriptionService {

    @Autowired
    private NewsletterSubscriptionRepository repository;

    public void subscribe(NewsletterSubscriptionDTO dto) throws Exception {
        Optional<NewsletterSubscription> existingSubscription = repository.findByEmail(dto.getEmail());
        if (existingSubscription.isPresent() && existingSubscription.get().getActive()) {
            throw new Exception("Email is already subscribed!");
        }

        NewsletterSubscription subscription = new NewsletterSubscription();
        subscription.setEmail(dto.getEmail());
        subscription.setName(dto.getName());
        subscription.setSurname(dto.getSurname());
        subscription.setBirthDate(dto.getBirthDate());

        repository.save(subscription);
    }

    public void unsubscribe(String email) throws Exception {
        Optional<NewsletterSubscription> subscription = repository.findByEmail(email);
        if (subscription.isPresent()) {
            NewsletterSubscription subs = subscription.get();
            subs.setActive(false);
            repository.save(subs);
        } else {
            throw new Exception("Subscription not found!");
        }
    }

    public List<String> getAllSubscribedUserEmails() {
        return repository.findAllActiveEmails();

    }
}

