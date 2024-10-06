package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FavoritePropertyDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyByLinkDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private static final Logger logger = LoggerFactory.getLogger(PropertyController.class);

    private final PropertyService propertyService;
    private final CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        logger.debug("Fetching all properties.");
        List<PropertyDTO> properties = propertyService.getAllProperties();
        logger.info("Retrieved {} properties.", properties.size());
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        logger.debug("Fetching property with ID: {}", id);
        PropertyDTO property = propertyService.getPropertyById(id);
        logger.info("Retrieved property: {}", property);
        return ResponseEntity.ok(property);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<PropertyDTO>> getPropertyByCity(@PathVariable String city) {
        logger.debug("Fetching properties for city: {}", city);
        List<PropertyDTO> properties = propertyService.getPropertyByCity(city);
        logger.info("Retrieved {} properties for city: {}", properties.size(), city);
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/cheapest")
    public ResponseEntity<List<PropertyDTO>> get20CheapestProperties() {
        logger.debug("Fetching 20 cheapest properties.");
        List<PropertyDTO> properties = propertyService.get20Chepeastproperties();
        logger.info("Retrieved {} cheapest properties.", properties.size());
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<PropertyDTO>> get20FavoriteProperties() {
        logger.debug("Fetching 20 favorite properties.");
        List<PropertyDTO> properties = propertyService.get20FavoriteProperties();
        logger.info("Retrieved {} cheapest properties.", properties.size());
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<PropertyDTO>> getLast20Properties() {
        logger.debug("Fetching 20 latest properties.");
        List<PropertyDTO> properties = propertyService.get20LastProperties();
        logger.info("Retrieved {} filtered properties.", properties.size());
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/search-result")
    public ResponseEntity<List<PropertyDTO>> getFilteredProperties(@RequestBody FilterSearchPropertyDTO filterSearchPropertyDTO) {
        logger.debug("Filtering properties with criteria: {}", filterSearchPropertyDTO);
        List<PropertyDTO> properties = propertyService.getFilteredProperties(filterSearchPropertyDTO);
        if (filterSearchPropertyDTO.getDistance() != null && filterSearchPropertyDTO.getCity()!=null) {
            City city = cityRepository.findByName(filterSearchPropertyDTO.getCity().getName());
            double propertyLat = city.getLatitude();
            double propertyLon = city.getLongitude();
            propertyService.findPropertiesWithinDistance
                    (propertyLat, propertyLon, filterSearchPropertyDTO.getDistance());
        }
        logger.info("Retrieved {} filtered properties.", properties.size());
        return ResponseEntity.ok(properties);
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody PropertyDTO propertyDTO) {
        logger.debug("Creating property: {}", propertyDTO);
        PropertyDTO createdProperty = propertyService.createProperty(propertyDTO);
        logger.info("Successfully created property: {}", createdProperty);
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/add-favorite-property/{id}")
    public ResponseEntity<PropertyDTO> addFavoriteProperty(@PathVariable Long id) {
        logger.debug("Adding property ID {} to favorites.", id);

        FavoritePropertyDto favoritePropertyDto = new FavoritePropertyDto();
        favoritePropertyDto.setPropertyId(id);
        favoritePropertyDto.setIsFavorite(true);

        PropertyDTO updatedProperty = propertyService.addFavoriteProperty(favoritePropertyDto);
        logger.info("Property ID {} marked as favorite.", id);
        return ResponseEntity.ok(updatedProperty);
    }

    @PostMapping("/by-link")
    public ResponseEntity<PropertyDTO> createPropertyByLink(@RequestBody PropertyByLinkDto propertyByLinkDto) {
        logger.debug("Creating property from link: {}", propertyByLinkDto.getLink());

        PropertyDTO createdProperty = new PropertyDTO();
        createdProperty.setSocialMediaLink(propertyByLinkDto.getLink());
        createdProperty.setPrice(propertyByLinkDto.getPrice());

        propertyService.createProperty(createdProperty);
        logger.info("Successfully created property from link: {}", propertyByLinkDto.getLink());
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(@PathVariable Long id, @RequestBody PropertyDTO propertyDTO) {
        logger.debug("Updating property ID {}: {}", id, propertyDTO);

        PropertyDTO updatedProperty = propertyService.updateProperty(id, propertyDTO);
        logger.info("Successfully updated property ID {}: {}", id, updatedProperty);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        logger.debug("Deleting property ID {}.", id);
        propertyService.deleteProperty(id);
        logger.info("Successfully deleted property ID {}.", id);
        return ResponseEntity.noContent().build();
    }
}
