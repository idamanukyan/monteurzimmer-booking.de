package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
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

    public List<PropertyDTO> getFilteredProperties(FilterSearchPropertyDTO propertyDTO) {
        Specification<Property> spec = Specification.where(null);

        if (propertyDTO.getCity() != null) {
            spec = spec.and(PropertySpecification.withCity(propertyDTO.getCity()));
        }
        if (propertyDTO.getNumberOfGuests() != null) {
            spec = spec.and(PropertySpecification.withNumberOfGuests(propertyDTO.getNumberOfGuests()));
        }
        if (propertyDTO.getPropertyType() != null) {
            spec = spec.and(PropertySpecification.withPropertyType(propertyDTO.getPropertyType()));
        }
        if (propertyDTO.getNeighborhood() != null) {
            spec = spec.and(PropertySpecification.withNeighborhood(propertyDTO.getNeighborhood()));
        }
        if (propertyDTO.getMinPrice() != null) {
            spec = spec.and(PropertySpecification.withMinPrice(propertyDTO.getMinPrice()));
        }
        if (propertyDTO.getMaxPrice() != null) {
            spec = spec.and(PropertySpecification.withMaxPrice(propertyDTO.getMaxPrice()));
        }
        if (propertyDTO.getRoomCount() > 0) {
            spec = spec.and(PropertySpecification.withRoomCount(propertyDTO.getRoomCount()));
        }

        // Check if each boolean value is true, if so add it to the specification.
        if (propertyDTO.isWlan()) {
            spec = spec.and(PropertySpecification.withWlan(propertyDTO.isWlan()));
        }
        if (propertyDTO.isTv()) {
            spec = spec.and(PropertySpecification.withTv(propertyDTO.isTv()));
        }
        if (propertyDTO.isGetrennteBetten()) {
            spec = spec.and(PropertySpecification.withGetrennteBetten(propertyDTO.isGetrennteBetten()));
        }
        if (propertyDTO.isPrivatesBad()) {
            spec = spec.and(PropertySpecification.withPrivatesBad(propertyDTO.isPrivatesBad()));
        }
        if (propertyDTO.isKochmoglichkeit()) {
            spec = spec.and(PropertySpecification.withKochmoglichkeit(propertyDTO.isKochmoglichkeit()));
        }
        if (propertyDTO.isRadio()) {
            spec = spec.and(PropertySpecification.withRadio(propertyDTO.isRadio()));
        }
        if (propertyDTO.isHandtucherInkl()) {
            spec = spec.and(PropertySpecification.withHandtucherInkl(propertyDTO.isHandtucherInkl()));
        }
        if (propertyDTO.isZustellbettMoglich()) {
            spec = spec.and(PropertySpecification.withZustellbettMoglich(propertyDTO.isZustellbettMoglich()));
        }
        if (propertyDTO.isBettwascheInkl()) {
            spec = spec.and(PropertySpecification.withBettwascheInkl(propertyDTO.isBettwascheInkl()));
        }
        if (propertyDTO.isKuhlschrank()) {
            spec = spec.and(PropertySpecification.withKuehlschrank(propertyDTO.isKuhlschrank()));
        }
        if (propertyDTO.isKaffeemaschine()) {
            spec = spec.and(PropertySpecification.withKaffeemaschine(propertyDTO.isKaffeemaschine()));
        }
        if (propertyDTO.isMikrowelle()) {
            spec = spec.and(PropertySpecification.withMikrowelle(propertyDTO.isMikrowelle()));
        }
        if (propertyDTO.isSpulmaschine()) {
            spec = spec.and(PropertySpecification.withSpuelmaschine(propertyDTO.isSpulmaschine()));
        }
        if (propertyDTO.isWc()) {
            spec = spec.and(PropertySpecification.withWc(propertyDTO.isWc()));
        }
        if (propertyDTO.isTerrasse()) {
            spec = spec.and(PropertySpecification.withTerrasse(propertyDTO.isTerrasse()));
        }
        if (propertyDTO.isWasserkocher()) {
            spec = spec.and(PropertySpecification.withWasserkocher(propertyDTO.isWasserkocher()));
        }
        if (propertyDTO.isBadewanne()) {
            spec = spec.and(PropertySpecification.withBadewanne(propertyDTO.isBadewanne()));
        }
        if (propertyDTO.isGarten()) {
            spec = spec.and(PropertySpecification.withGarten(propertyDTO.isGarten()));
        }
        if (propertyDTO.isKochutensilien()) {
            spec = spec.and(PropertySpecification.withKochutensilien(propertyDTO.isKochutensilien()));
        }
        if (propertyDTO.isWaschmaschine()) {
            spec = spec.and(PropertySpecification.withWaschmaschine(propertyDTO.isWaschmaschine()));
        }
        if (propertyDTO.isEigenstandigerCheckIn()) {
            spec = spec.and(PropertySpecification.withEigenstandigerCheckIn(propertyDTO.isEigenstandigerCheckIn()));
        }
        if (propertyDTO.isRaucher()) {
            spec = spec.and(PropertySpecification.withRaucher(propertyDTO.isRaucher()));
        }
        if (propertyDTO.isRuhigeLage()) {
            spec = spec.and(PropertySpecification.withRuhigeLage(propertyDTO.isRuhigeLage()));
        }
        if (propertyDTO.isGuteVerkehrsanbindung()) {
            spec = spec.and(PropertySpecification.withGuteVerkehrsanbindung(propertyDTO.isGuteVerkehrsanbindung()));
        }
        if (propertyDTO.isGeschaefteInDerNahe()) {
            spec = spec.and(PropertySpecification.withGeschaefteInDerNahe(propertyDTO.isGeschaefteInDerNahe()));
        }

        List<Property> filteredProperties = propertyRepository.findAll(spec);
        return filteredProperties.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }


    public PropertyDTO getPropertyById(Long id) {
        log.info("User has tried to get information about a user");
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return modelMapper.map(property, PropertyDTO.class);
    }

    public List<PropertyDTO> getPropertyByCity(String city) {
        log.info("User has tried to get information about a user");
        List<Property> propertyList = propertyRepository.findByCity(city);
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> get20Chepeastproperties() {
        log.info("User has tried to get information about a user");
        List<Property> propertyList = propertyRepository.find20Chepeast();
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
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
