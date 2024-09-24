package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.UserSession;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserSessionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    @Scheduled(fixedRate = 60000) // Check every minute
    public void updateExpiredSessions() {
        List<UserSession> sessions = userSessionsRepository.findAll();
        for (UserSession session : sessions) {
            if (session.getExpiryTimestamp().isBefore(LocalDateTime.now())) {
                session.setActive(false);
                userSessionsRepository.save(session);
            }
        }
    }
}

