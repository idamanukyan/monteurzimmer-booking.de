package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.EmailVerification;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.EmailVerificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailVerificationsService {

    @Autowired
    private EmailVerificationsRepository emailVerificationsRepository;

    public EmailVerification createEmailVerification(EmailVerification emailVerification) {
        return emailVerificationsRepository.save(emailVerification);
    }
}

