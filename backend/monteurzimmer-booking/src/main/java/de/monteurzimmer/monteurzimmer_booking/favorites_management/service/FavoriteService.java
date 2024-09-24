package de.monteurzimmer.monteurzimmer_booking.favorites_management.service;

import de.monteurzimmer.monteurzimmer_booking.favorites_management.entity.Favorite;
import de.monteurzimmer.monteurzimmer_booking.favorites_management.repository.FavoriteRepository;
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

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PropertyService propertyService;

    public Favorite addFavorite(Long propertyId, String sessionId) {

        PropertyDTO propertyDTO = propertyService.getPropertyById(propertyId);
        Property property = mapper.map(propertyDTO, Property.class);

        Favorite favorite;

        User currentUser = userService.getCurrentUser();

        if (currentUser != null) {
            favorite = favoriteRepository.findByUserAndProperty(currentUser, property)
                    .orElse(new Favorite());
            favorite.setUser(currentUser);
        } else if (sessionId != null) {
            favorite = favoriteRepository.findBySessionIdAndProperty(sessionId, property)
                    .orElse(new Favorite());
            favorite.setSessionId(sessionId);
        } else {

            throw new IllegalArgumentException("User must be logged in or provide a valid session ID.");
        }

        favorite.setProperty(property);
        favorite.setCreatedAt(LocalDateTime.now());

        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(Long propertyId, String sessionId) {
        PropertyDTO propertyDTO = propertyService.getPropertyById(propertyId);
        User currentUser = userService.getCurrentUser();

        Property property = mapper.map(propertyDTO, Property.class);


        if (currentUser != null) {
            favoriteRepository.findByUserAndProperty(currentUser, property)
                    .ifPresent(favoriteRepository::delete);
        } else {
            favoriteRepository.findBySessionIdAndProperty(sessionId, property)
                    .ifPresent(favoriteRepository::delete);
        }
    }

    public List<Favorite> getFavorites(String sessionId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            return favoriteRepository.findByUser(currentUser);
        } else {
            return favoriteRepository.findBySessionId(sessionId);
        }
    }
}
