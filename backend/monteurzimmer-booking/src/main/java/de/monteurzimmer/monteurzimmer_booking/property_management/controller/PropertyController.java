package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyByLinkDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Controller for managing properties in the application.
 * Provides endpoints for creating, retrieving, updating, and deleting properties,
 * as well as filtering and marking properties as favorites.
 * <p>
 * API Endpoints:
 * - GET /api/properties: Retrieve all properties
 * - GET /api/properties/{id}: Retrieve a property by its ID
 * - GET /api/properties/{city}: Retrieve properties by city
 * - GET /api/properties/cheapest: Retrieve 20 cheapest properties
 * - GET /api/properties/search-result: Retrieve filtered properties based on search criteria
 * - POST /api/properties: Create a new property
 * - PUT /api/properties/add-favorite-property/{id}: Mark a property as favorite
 * - POST /api/properties/by-link: Create a property from a social media link
 * - PUT /api/properties/{id}: Update an existing property
 * - DELETE /api/properties/{id}: Delete a property by its ID
 */
@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    private final CityRepository cityRepository;
    private final LogEntryService logEntryService;

    @GetMapping
    public ResponseEntity<Page<PropertyDTO>> getAllProperties(@PageableDefault(size = 20) Pageable pageable) {
        Page<PropertyDTO> properties = propertyService.getAllProperties(pageable);
        logEntryService.log("INFO", "Retrieved " + properties.getTotalElements() + " properties.");
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        PropertyDTO property = propertyService.getPropertyById(id);
        logEntryService.log("INFO", "Retrieved property: " + property.getId());
        return ResponseEntity.ok(property);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<Page<PropertyDTO>> getPropertyByCity(@PathVariable String city,
                                                               @PageableDefault(size = 20) Pageable pageable) {
        Page<PropertyDTO> properties = propertyService.getPropertyByCity(city, pageable);
        logEntryService.log("INFO", "Retrieved " + properties.getTotalElements() + " properties for city: " + city);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/cheapest")
    public ResponseEntity<List<PropertyDTO>> get20CheapestProperties() {
        List<PropertyDTO> properties = propertyService.get20Chepeastproperties();
        logEntryService.log("INFO", "Retrieved " + properties.size() + " cheapest properties.");
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<PropertyDTO>> get20FavoriteProperties() {
        List<PropertyDTO> properties = propertyService.get20FavoriteProperties();
        logEntryService.log("INFO", "Retrieved " + properties.size() + " favorite properties.");
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<PropertyDTO>> getLast20Properties() {
        List<PropertyDTO> properties = propertyService.get20LastProperties();
        logEntryService.log("INFO", "Retrieved " + properties.size() + " latest properties.");
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/find-by-link")
    public ResponseEntity<PropertyDTO> getPropertyByLink(@RequestParam("url") String encodedUrl) {
        String decodedUrl = URLDecoder.decode(encodedUrl, StandardCharsets.UTF_8);
        PropertyDTO property = propertyService.getPropertyByLink(decodedUrl);
        return ResponseEntity.ok(property);
    }

    @PostMapping("/search-result")
    public ResponseEntity<Page<PropertyDTO>> getFilteredProperties(@RequestBody FilterSearchPropertyDTO filterSearchPropertyDTO,
                                                                   @PageableDefault(size = 20) Pageable pageable) {

        Page<PropertyDTO> properties = propertyService.getFilteredProperties(filterSearchPropertyDTO, pageable);

        if (filterSearchPropertyDTO.getDistance() != null && filterSearchPropertyDTO.getCity() != null) {
            City city = cityRepository.findByName(filterSearchPropertyDTO.getCity().getName());
            double propertyLat = city.getLatitude();
            double propertyLon = city.getLongitude();
            propertyService.findPropertiesWithinDistance(propertyLat, propertyLon, filterSearchPropertyDTO.getDistance());
        }
        logEntryService.log("INFO", "Retrieved " + properties.getTotalElements() + " filtered properties.");
        return ResponseEntity.ok(properties);
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody PropertyDTO propertyDTO) {
        PropertyDTO createdProperty = propertyService.createProperty(propertyDTO);
        logEntryService.log("INFO", "Successfully created property: " + createdProperty.getId());
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/add-favorite-property/{id}")
    public ResponseEntity<PropertyDTO> addFavoriteProperty(@PathVariable Long id) {
        PropertyDTO updatedProperty = propertyService.addFavoriteProperty(id);
        logEntryService.log("INFO", "Property ID " + id + " marked as favorite.");
        return ResponseEntity.ok(updatedProperty);
    }

    @PostMapping("/by-link")
    public ResponseEntity<PropertyDTO> createPropertyByLink(@RequestBody PropertyByLinkDto propertyByLinkDto) {

        PropertyDTO createdProperty = new PropertyDTO();
        createdProperty.setSocialMediaLink(propertyByLinkDto.getLink());
        createdProperty.setPrice(propertyByLinkDto.getPrice());

        propertyService.createProperty(createdProperty);
        logEntryService.log("INFO", "Successfully created property from link: " + propertyByLinkDto.getLink());
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(@PathVariable Long id, @RequestBody PropertyDTO propertyDTO) {
        PropertyDTO updatedProperty = propertyService.updateProperty(id, propertyDTO);
        logEntryService.log("INFO", "Successfully updated property ID " + id + ": " + updatedProperty.getId());
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        logEntryService.log("INFO", "Successfully deleted property ID " + id + ".");
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/remove/by/link")
    public ResponseEntity<Void> deleteProperty(@RequestParam String url) {
        propertyService.deletePropertyByLink(url);
        logEntryService.log("INFO", "Successfully deleted property with URL " + url + ".");
        return ResponseEntity.noContent().build();
    }
}
