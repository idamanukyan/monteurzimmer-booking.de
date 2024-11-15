package de.monteurzimmer.monteurzimmer_booking.favorites_management.service;

import de.monteurzimmer.monteurzimmer_booking.favorites_management.entity.Favorite;
import de.monteurzimmer.monteurzimmer_booking.favorites_management.repository.FavoriteRepository;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.PropertyService;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import de.monteurzimmer.monteurzimmer_booking.user_management.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final ModelMapper mapper;
    private final PropertyService propertyService;
    private final LogEntryService logEntryService;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, UserService userService, ModelMapper mapper, PropertyService propertyService, LogEntryService logEntryService) {
        this.favoriteRepository = favoriteRepository;
        this.userService = userService;
        this.mapper = mapper;
        this.propertyService = propertyService;
        this.logEntryService = logEntryService;
    }

    public Favorite addFavorite(Long propertyId, String sessionId) {
        logEntryService.log("info", "Request to add favorite with propertyId: " + propertyId + " and sessionId: " + sessionId);

        PropertyDTO propertyDTO = propertyService.getPropertyById(propertyId);
        Property property = mapper.map(propertyDTO, Property.class);

        Favorite favorite;

        User currentUser = userService.getCurrentUser();

        if (currentUser != null) {
            favorite = favoriteRepository.findByUserAndProperty(currentUser, property)
                    .orElse(new Favorite());
            favorite.setUser(currentUser);
            logEntryService.log("info", "Favorite created for logged-in user: " + currentUser.getEmail());
        } else if (sessionId != null) {
            favorite = favoriteRepository.findBySessionIdAndProperty(sessionId, property)
                    .orElse(new Favorite());
            favorite.setSessionId(sessionId);
            logEntryService.log("info", "Favorite created for sessionId: " + sessionId);
        } else {
            logEntryService.log("error", "User must be logged in or provide a valid session ID.");
            throw new IllegalArgumentException("User must be logged in or provide a valid session ID.");
        }

        favorite.setProperty(property);
        favorite.setCreatedAt(LocalDateTime.now());

        Favorite savedFavorite = favoriteRepository.save(favorite);
        logEntryService.log("info", "Favorite saved successfully with propertyId: " + propertyId);
        return savedFavorite;
    }

    public void removeFavorite(Long propertyId, String sessionId) {
        logEntryService.log("info", "Request to remove favorite with propertyId: " + propertyId + " and sessionId: " + sessionId);

        PropertyDTO propertyDTO = propertyService.getPropertyById(propertyId);
        Property property = mapper.map(propertyDTO, Property.class);

        User currentUser = userService.getCurrentUser();

        if (currentUser != null) {
            favoriteRepository.findByUserAndProperty(currentUser, property)
                    .ifPresent(favorite -> {
                        favoriteRepository.delete(favorite);
                        logEntryService.log("info", "Favorite removed for logged-in user: " + currentUser.getEmail());
                    });
        } else {
            favoriteRepository.findBySessionIdAndProperty(sessionId, property)
                    .ifPresent(favorite -> {
                        favoriteRepository.delete(favorite);
                        logEntryService.log("info", "Favorite removed for sessionId: " + sessionId);
                    });
        }
    }

    public List<Favorite> getFavorites(String sessionId) {
        logEntryService.log("info", "Request to get favorites for sessionId: " + sessionId);

        User currentUser = userService.getCurrentUser();
        List<Favorite> favorites;

        if (currentUser != null) {
            favorites = favoriteRepository.findByUser(currentUser);
            logEntryService.log("info", "Found " + favorites.size() + " favorites for user: " + currentUser.getEmail());
        } else {
            favorites = favoriteRepository.findBySessionId(sessionId);
            logEntryService.log("info", "Found " + favorites.size() + " favorites for sessionId: " + sessionId);
        }

        return favorites;
    }
}
