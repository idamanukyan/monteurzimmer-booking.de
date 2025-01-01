package de.monteurzimmer.monteurzimmer_booking.favorites_management.controller;

import de.monteurzimmer.monteurzimmer_booking.favorites_management.entity.Favorite;
import de.monteurzimmer.monteurzimmer_booking.favorites_management.service.FavoriteService;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/session/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final LogEntryService logEntryService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService, LogEntryService logEntryService) {
        this.favoriteService = favoriteService;
        this.logEntryService = logEntryService;
    }

    @PostMapping("/add/{propertyId}")
    public ResponseEntity<Favorite> addFavorite(@PathVariable Long propertyId,
                                                @RequestParam String sessionId) {

        logEntryService.log("info", "Received request to add favorite with propertyId: " + propertyId + " and sessionId: " + sessionId);

        if (sessionId == null || sessionId.isEmpty()) {
            logEntryService.log("error", "Session ID is null or empty.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Favorite favorite = favoriteService.addFavorite(propertyId, sessionId);
        logEntryService.log("info", "Favorite added successfully: " + favorite);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove/{propertyId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long propertyId,
                                               @RequestParam String sessionId) {
        logEntryService.log("info", "Received request to remove favorite with propertyId: " + propertyId + " and sessionId: " + sessionId);

        favoriteService.removeFavorite(propertyId, sessionId);
        logEntryService.log("info", "Favorite removed successfully for propertyId: " + propertyId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam String sessionId) {
        logEntryService.log("info", "Received request to list favorites for sessionId: " + sessionId);

        sessionId = sessionId.trim();
        List<Favorite> favorites = favoriteService.getFavorites(sessionId);

        logEntryService.log("info", "Favorites retrieved: " + favorites.size() + " items found.");
        return ResponseEntity.ok(favorites);
    }

    //Check if the session is present (sessionID) -> check the expiry timestamp
    @GetMapping("/session/isActive")
    public ResponseEntity<Boolean> isSessionActive(@RequestParam String sessionId){
        logEntryService.log("info", "Received request to check if the sessionId: " +
                sessionId + " is present and expired.");

        sessionId = sessionId.trim();

        Boolean isActive = favoriteService.checkIsActiveAndPresent(sessionId);

        return ResponseEntity.ok(isActive);
    }
}


