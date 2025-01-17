package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.UserSession;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserSessionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserSessionsService {

    @Autowired
    private UserSessionsRepository userSessionsRepository;

    public String createSession() {

        String sessionId = UUID.randomUUID().toString();

        UserSession userSession = new UserSession();
        userSession.setSessionId(sessionId);
        userSession.setActive(true);
        userSession.setExpiryTimestamp(LocalDateTime.now().plusMinutes(30));

        userSessionsRepository.save(userSession);
        return sessionId;
    }
}

