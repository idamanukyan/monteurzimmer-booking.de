package de.monteurzimmer.monteurzimmer_booking.city_management.controller;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.entity.CityDto;
import de.monteurzimmer.monteurzimmer_booking.city_management.service.CityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Controller for managing city-related operations.
 * This class provides endpoints to add, retrieve, and manage cities.
 * It handles HTTP requests for creating new cities, fetching all cities,
 * retrieving a specific city by ID, marking cities as favorites,
 * and managing city photo uploads.
 */

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private static final Logger logger = LoggerFactory.getLogger(CityController.class);

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<CityDto> addCity(@RequestParam("name") String name, @RequestParam("isFavorite") Boolean isFavorite, @RequestParam("photoFile") MultipartFile photoFile) {
        logger.debug("Adding city with name: {}", name);

        if (name == null || name.trim().isEmpty()) {
            logger.error("City name must not be null or empty.");
            return ResponseEntity.badRequest().build();
        }

        CityDto cityDto = new CityDto();
        cityDto.setName(name);
        cityDto.setIsFavorite(isFavorite);

        try {
            String photoUrl = cityService.storePhoto(photoFile);
            cityDto.setPhoto(photoUrl);
        } catch (IllegalArgumentException e) {
            logger.error("Error storing photo: {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

        CityDto createdCity = cityService.addCity(cityDto);
        logger.info("City created successfully: {}", createdCity.getName());
        return ResponseEntity.ok(cityDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CityDto>> getAllCities() {
        logger.debug("Fetching all cities.");
        List<CityDto> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDto> getCityById(@PathVariable Long id) {
        logger.debug("Fetching city with ID: {}", id);
        try {
            CityDto cityDto = cityService.getCityById(id);
            return ResponseEntity.ok(cityDto);
        } catch (RuntimeException e) {
            logger.error("City not found: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<CityDto>> getFavoriteCities() {
        logger.debug("Fetching favorite cities.");
        List<CityDto> favoriteCities = cityService.getFavoriteCities();
        return ResponseEntity.ok(favoriteCities);
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<City> markAsFavorite(@PathVariable Long id) {
        logger.debug("Marking city with ID: {} as favorite", id);
        try {
            City city = cityService.markAsFavorite(id);
            return ResponseEntity.ok(city);
        } catch (RuntimeException e) {
            logger.error("Error marking city as favorite: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/unfavorite")
    public ResponseEntity<City> unmarkAsFavorite(@PathVariable Long id) {
        logger.debug("Unmarking city with ID: {} from favorite", id);
        try {
            City city = cityService.unmarkAsFavorite(id);
            return ResponseEntity.ok(city);
        } catch (RuntimeException e) {
            logger.error("Error unmarking city as favorite: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
