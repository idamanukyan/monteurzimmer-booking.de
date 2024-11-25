package de.monteurzimmer.monteurzimmer_booking.city_management.controller;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.entity.CityDto;
import de.monteurzimmer.monteurzimmer_booking.city_management.service.CityService;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
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

    private final LogEntryService logEntryService;
    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService, LogEntryService logEntryService) {
        this.cityService = cityService;
        this.logEntryService = logEntryService;
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<CityDto> addCity(@RequestParam("name") String name,
                                           @RequestParam(value = "isFavorite", required = false) Boolean isFavorite,
                                           @RequestParam("photoFile") MultipartFile photoFile,
                                           @RequestParam("latitude") double latitude,
                                           @RequestParam("longitude") double longitude) {

        logEntryService.log("info", "Received request to add city with name: " + name);

        if (name == null || name.trim().isEmpty()) {
            logEntryService.log("error", "City name must not be null or empty.");
            return ResponseEntity.badRequest().build();
        }

        CityDto cityDto = new CityDto();
        cityDto.setName(name);
        cityDto.setIsFavorite(isFavorite);

        try {
            logEntryService.log("info", "Storing photo for city: " + name);
            String photoUrl = cityService.storePhoto(photoFile);
            cityDto.setPhoto(photoUrl);
            logEntryService.log("info", "Photo stored successfully for city: " + name + ", URL: " + photoUrl);
        } catch (IllegalArgumentException e) {
            logEntryService.log("error", "Error storing photo for city: " + name + ". Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

        CityDto createdCity = cityService.addCity(cityDto);
        logEntryService.log("info", "City added successfully with name: " + createdCity.getName());
        return ResponseEntity.ok(createdCity);
    }

    @CrossOrigin(origins = "https://check-monteurzimmer-frontend-6f3b50cb8e29.herokuapp.com")  // Allow CORS for this method
    @GetMapping("/all")
    public ResponseEntity<List<CityDto>> getAllCities() {
        logEntryService.log("info", "Fetching all cities.");
        List<CityDto> cities = cityService.getAllCities();
        logEntryService.log("info", "Retrieved " + cities.size() + " cities.");
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDto> getCityById(@PathVariable Long id) {
        logEntryService.log("info", "Fetching city with ID: " + id);
        try {
            CityDto cityDto = cityService.getCityById(id);
            logEntryService.log("info", "City found: " + cityDto.getName());
            return ResponseEntity.ok(cityDto);
        } catch (RuntimeException e) {
            logEntryService.log("error", "City not found with ID: " + id + ". Error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "https://check-monteurzimmer-frontend-6f3b50cb8e29.herokuapp.com")  // Allow CORS for this method
    @GetMapping("/favorites")
    public ResponseEntity<List<CityDto>> getFavoriteCities() {
        logEntryService.log("info", "Fetching favorite cities.");
        List<CityDto> favoriteCities = cityService.getFavoriteCities();
        logEntryService.log("info", "Retrieved " + favoriteCities.size() + " favorite cities.");
        return ResponseEntity.ok(favoriteCities);
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<City> markAsFavorite(@PathVariable Long id) {
        logEntryService.log("info", "Marking city with ID: " + id + " as favorite.");
        try {
            City city = cityService.markAsFavorite(id);
            logEntryService.log("info", "City with ID: " + id + " marked as favorite.");
            return ResponseEntity.ok(city);
        } catch (RuntimeException e) {
            logEntryService.log("error", "Error marking city with ID: " + id + " as favorite. Error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/unfavorite")
    public ResponseEntity<City> unmarkAsFavorite(@PathVariable Long id) {
        logEntryService.log("info", "Unmarking city with ID: " + id + " as favorite.");
        try {
            City city = cityService.unmarkAsFavorite(id);
            logEntryService.log("info", "City with ID: " + id + " unmarked as favorite.");
            return ResponseEntity.ok(city);
        } catch (RuntimeException e) {
            logEntryService.log("error", "Error unmarking city with ID: " + id + " as favorite. Error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}

