package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.PasswordReset;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.PasswordResetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetsService {

    @Autowired
    private PasswordResetsRepository passwordResetsRepository;

    public PasswordReset createPasswordReset(PasswordReset passwordReset) {
        return passwordResetsRepository.save(passwordReset);
    }
}

