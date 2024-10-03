package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FavoritePropertyDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyByLinkDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        List<PropertyDTO> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        PropertyDTO property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(property);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<PropertyDTO>> getPropertyByCity(@PathVariable String city) {
        List<PropertyDTO> property = propertyService.getPropertyByCity(city);
        return ResponseEntity.ok(property);
    }

    @GetMapping("/cheapest")
    public ResponseEntity<List<PropertyDTO>> get20CheapestProperties() {
        List<PropertyDTO> propertyDTOS = propertyService.get20Chepeastproperties();
        return ResponseEntity.ok(propertyDTOS);
    }

    @GetMapping("/search-result")
    public ResponseEntity<List<PropertyDTO>> getFilteredProperties(@RequestBody FilterSearchPropertyDTO filterSearchPropertyDTO) {
        List<PropertyDTO> properties = propertyService.getFilteredProperties(filterSearchPropertyDTO);
        return ResponseEntity.ok(properties);
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody PropertyDTO propertyDTO) {
        PropertyDTO createdProperty = propertyService.createProperty(propertyDTO);
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/add-favorite-property/{id}")
    public ResponseEntity<PropertyDTO> addFavoriteProperty(@PathVariable Long id) {

        FavoritePropertyDto favoritePropertyDto = new FavoritePropertyDto();
        favoritePropertyDto.setPropertyId(id);
        favoritePropertyDto.setIsFavorite(true);
        PropertyDTO createdProperty = propertyService.addFavoriteProperty(favoritePropertyDto);
        return ResponseEntity.ok(createdProperty);
    }

    @PostMapping("/by-link")
    public ResponseEntity<PropertyDTO> createPropertyByLink(@RequestBody PropertyByLinkDto propertyByLinkDto) {
        PropertyDTO createdProperty = new PropertyDTO();
        createdProperty.setSocialMediaLink(propertyByLinkDto.getLink());
        createdProperty.setPrice(propertyByLinkDto.getPrice());
        propertyService.createProperty(createdProperty);
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(@PathVariable Long id, @RequestBody PropertyDTO propertyDTO) {
        PropertyDTO updatedProperty = propertyService.updateProperty(id, propertyDTO);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}

