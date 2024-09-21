package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.UserSession;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserSessionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSessionsService {

    @Autowired
    private UserSessionsRepository userSessionsRepository;

    public UserSession createUserSession(UserSession userSession) {
        return userSessionsRepository.save(userSession);
    }
}

