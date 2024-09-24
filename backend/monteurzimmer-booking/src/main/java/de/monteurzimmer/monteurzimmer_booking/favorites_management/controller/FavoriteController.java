package de.monteurzimmer.monteurzimmer_booking.favorites_management.controller;

import de.monteurzimmer.monteurzimmer_booking.favorites_management.entity.Favorite;
import de.monteurzimmer.monteurzimmer_booking.favorites_management.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/add/{propertyId}")
    public ResponseEntity<Favorite> addFavorite(@PathVariable Long propertyId,
                                                @RequestParam String sessionId) {

        System.out.println("Received request to add favorite with propertyId: " + propertyId + " and sessionId: " + sessionId);

        if (sessionId == null || sessionId.isEmpty()) {
            System.out.println("Session ID is null or empty.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Favorite favorite = favoriteService.addFavorite(propertyId, sessionId);
        System.out.println("Favorite added: " + favorite);

        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove/{propertyId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long propertyId,
                                               @RequestParam String sessionId) {
        favoriteService.removeFavorite(propertyId, sessionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam String sessionId) {

        sessionId = sessionId.trim();

        List<Favorite> favorites = favoriteService.getFavorites(sessionId);
        return ResponseEntity.ok(favorites);
    }
}

