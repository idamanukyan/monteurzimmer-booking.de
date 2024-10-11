package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.RelatedPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.RelatedPropertyService;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService; // Import your custom log service
import lombok.RequiredArgsConstructor;
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

    private final RelatedPropertyService relatedPropertyService;
    private final LogEntryService logEntryService; // Add your custom log service

    @GetMapping
    public ResponseEntity<List<RelatedPropertyDTO>> getAllRelatedProperties() {
        logEntryService.log("DEBUG", "Fetching all related properties.");
        List<RelatedPropertyDTO> relatedProperties = relatedPropertyService.getAllRelatedProperties();
        logEntryService.log("INFO", "Retrieved {} related properties." + String.valueOf(relatedProperties.size()));
        return ResponseEntity.ok(relatedProperties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> getRelatedPropertyById(@PathVariable Long id) {
        logEntryService.log("DEBUG", "Fetching related property with ID: {}" + String.valueOf(id));
        RelatedPropertyDTO relatedProperty = relatedPropertyService.getRelatedPropertyById(id);
        logEntryService.log("INFO", "Retrieved related property: {}" + relatedProperty.toString());
        return ResponseEntity.ok(relatedProperty);
    }

    @PostMapping
    public ResponseEntity<RelatedPropertyDTO> createRelatedProperty(@RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        logEntryService.log("DEBUG", "Creating related property: {}" + relatedPropertyDTO.toString());
        RelatedPropertyDTO createdRelatedProperty = relatedPropertyService.createRelatedProperty(relatedPropertyDTO);
        logEntryService.log("INFO", "Successfully created related property: {}" + createdRelatedProperty.toString());
        return ResponseEntity.status(201).body(createdRelatedProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> updateRelatedProperty(@PathVariable Long id, @RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        logEntryService.log("DEBUG", "Updating related property ID {}: {}" + id + relatedPropertyDTO.toString());
        RelatedPropertyDTO updatedRelatedProperty = relatedPropertyService.updateRelatedProperty(id, relatedPropertyDTO);
        logEntryService.log("INFO", "Successfully updated related property ID {}: {}" + id + updatedRelatedProperty.toString());
        return ResponseEntity.ok(updatedRelatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelatedProperty(@PathVariable Long id) {
        logEntryService.log("DEBUG", "Deleting related property ID {}." + id);
        relatedPropertyService.deleteRelatedProperty(id);
        logEntryService.log("INFO", "Successfully deleted related property ID {}." + id);
        return ResponseEntity.noContent().build();
    }
}
