package de.monteurzimmer.monteurzimmer_booking.user_management.controller;

import de.monteurzimmer.monteurzimmer_booking.user_management.service.UserSessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/session")
public class UserSessionController {

    @Autowired
    private UserSessionsService userSessionService;

    @GetMapping("/create")
    public ResponseEntity<Map<String, String>> createSession() {
        String sessionId = userSessionService.createSession();
        System.out.println(sessionId);
        return ResponseEntity.ok(Map.of("sessionId", sessionId));
    }
}
