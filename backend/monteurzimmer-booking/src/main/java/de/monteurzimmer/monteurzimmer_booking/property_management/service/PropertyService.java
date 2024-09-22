package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {

    final Logger log = LoggerFactory.getLogger(PropertyService.class);

    private final PropertyRepository propertyRepository;
    private final ModelMapper modelMapper;

    public List<PropertyDTO> getAllProperties() {
        log.info("User has tried to get all information about properties");
        List<Property> properties = propertyRepository.findAll();

        return properties.stream()
                .map(property -> {
                    PropertyDTO propertyDTO = modelMapper.map(property, PropertyDTO.class);
                    return propertyDTO;
                })
                .collect(Collectors.toList());
    }


    public PropertyDTO getPropertyById(Long id) {
        log.info("User has tried to get information about a user");
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return modelMapper.map(property, PropertyDTO.class);
    }

    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        // Map DTO to entity and save the property
        Property property = modelMapper.map(propertyDTO, Property.class);
        Property savedProperty = propertyRepository.save(property);

        // Return the saved property as a DTO
        return modelMapper.map(savedProperty, PropertyDTO.class);
    }


    public PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        modelMapper.map(propertyDTO, property);
        Property updatedProperty = propertyRepository.save(property);
        return modelMapper.map(updatedProperty, PropertyDTO.class);
    }

    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        propertyRepository.delete(property);
    }

}
