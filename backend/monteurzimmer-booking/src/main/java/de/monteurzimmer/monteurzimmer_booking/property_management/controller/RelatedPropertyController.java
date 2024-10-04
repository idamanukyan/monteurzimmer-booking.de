package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.RelatedPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.RelatedPropertyService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing related properties in the application.
 * Provides endpoints for creating, retrieving, updating, and deleting related properties.
 * <p>
 * API Endpoints:
 * - GET /api/related-properties: Retrieve all related properties
 * - GET /api/related-properties/{id}: Retrieve a related property by its ID
 * - POST /api/related-properties: Create a new related property
 * - PUT /api/related-properties/{id}: Update an existing related property
 * - DELETE /api/related-properties/{id}: Delete a related property by its ID
 */
@RestController
@RequestMapping("/api/related-properties")
@RequiredArgsConstructor
public class RelatedPropertyController {

    private static final Logger logger = LoggerFactory.getLogger(RelatedPropertyController.class);

    private final RelatedPropertyService relatedPropertyService;

    @GetMapping
    public ResponseEntity<List<RelatedPropertyDTO>> getAllRelatedProperties() {
        logger.debug("Fetching all related properties.");
        List<RelatedPropertyDTO> relatedProperties = relatedPropertyService.getAllRelatedProperties();
        logger.info("Retrieved {} related properties.", relatedProperties.size());
        return ResponseEntity.ok(relatedProperties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> getRelatedPropertyById(@PathVariable Long id) {
        logger.debug("Fetching related property with ID: {}", id);
        RelatedPropertyDTO relatedProperty = relatedPropertyService.getRelatedPropertyById(id);
        logger.info("Retrieved related property: {}", relatedProperty);
        return ResponseEntity.ok(relatedProperty);
    }

    @PostMapping
    public ResponseEntity<RelatedPropertyDTO> createRelatedProperty(@RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        logger.debug("Creating related property: {}", relatedPropertyDTO);
        RelatedPropertyDTO createdRelatedProperty = relatedPropertyService.createRelatedProperty(relatedPropertyDTO);
        logger.info("Successfully created related property: {}", createdRelatedProperty);
        return ResponseEntity.status(201).body(createdRelatedProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> updateRelatedProperty(@PathVariable Long id, @RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        logger.debug("Updating related property ID {}: {}", id, relatedPropertyDTO);
        RelatedPropertyDTO updatedRelatedProperty = relatedPropertyService.updateRelatedProperty(id, relatedPropertyDTO);
        logger.info("Successfully updated related property ID {}: {}", id, updatedRelatedProperty);
        return ResponseEntity.ok(updatedRelatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelatedProperty(@PathVariable Long id) {
        logger.debug("Deleting related property ID {}.", id);
        relatedPropertyService.deleteRelatedProperty(id);
        logger.info("Successfully deleted related property ID {}.", id);
        return ResponseEntity.noContent().build();
    }
}
