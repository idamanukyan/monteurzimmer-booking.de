package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.RelatedPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.RelatedPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/related-properties")
@RequiredArgsConstructor
public class RelatedPropertyController {

    private final RelatedPropertyService relatedPropertyService;

    @GetMapping
    public ResponseEntity<List<RelatedPropertyDTO>> getAllRelatedProperties() {
        List<RelatedPropertyDTO> relatedProperties = relatedPropertyService.getAllRelatedProperties();
        return ResponseEntity.ok(relatedProperties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> getRelatedPropertyById(@PathVariable Long id) {
        RelatedPropertyDTO relatedProperty = relatedPropertyService.getRelatedPropertyById(id);
        return ResponseEntity.ok(relatedProperty);
    }

    @PostMapping
    public ResponseEntity<RelatedPropertyDTO> createRelatedProperty(@RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        RelatedPropertyDTO createdRelatedProperty = relatedPropertyService.createRelatedProperty(relatedPropertyDTO);
        return ResponseEntity.status(201).body(createdRelatedProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RelatedPropertyDTO> updateRelatedProperty(@PathVariable Long id, @RequestBody RelatedPropertyDTO relatedPropertyDTO) {
        RelatedPropertyDTO updatedRelatedProperty = relatedPropertyService.updateRelatedProperty(id, relatedPropertyDTO);
        return ResponseEntity.ok(updatedRelatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelatedProperty(@PathVariable Long id) {
        relatedPropertyService.deleteRelatedProperty(id);
        return ResponseEntity.noContent().build();
    }
}

