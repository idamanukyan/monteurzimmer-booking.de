package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FavoritePropertyDto;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.PropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.util.DistanceUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private static final Logger log = LoggerFactory.getLogger(PropertyService.class);

    private final PropertyRepository propertyRepository;
    private final CityRepository cityRepository;
    private final ModelMapper modelMapper;

    public List<PropertyDTO> getAllProperties() {
        log.info("Fetching all properties.");
        List<Property> properties = propertyRepository.findAll();

        return properties.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> getFilteredProperties(FilterSearchPropertyDTO propertyDTO) {
        log.info("Filtering properties with criteria: {}", propertyDTO);
        Specification<Property> spec = Specification.where(null);

        if (propertyDTO.getCity() != null) {
            spec = spec.and(PropertySpecification.withCity(propertyDTO.getCity().getName()));
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
            if (propertyDTO.getMaxPrice() == null) {
                spec = spec.and(PropertySpecification.withPriceRange(propertyDTO.getMinPrice(), null));
            }
        }
        if (propertyDTO.getMaxPrice() != null) {
            if (propertyDTO.getMinPrice() == null) {
                spec = spec.and(PropertySpecification.withPriceRange(null, propertyDTO.getMaxPrice()));
            }
        }
        if (propertyDTO.getMaxPrice() != null && propertyDTO.getMinPrice() != null) {
                spec = spec.and(PropertySpecification.withPriceRange(propertyDTO.getMinPrice(), propertyDTO.getMaxPrice()));
            }
        if (propertyDTO.getRoomCount() != null)
            if (propertyDTO.getRoomCount() > 0) {
                spec = spec.and(PropertySpecification.withRoomCount(propertyDTO.getRoomCount()));
            }

        addBooleanSpecifications(spec, propertyDTO);

        List<Property> filteredProperties = propertyRepository.findAll(spec);
        log.info("Retrieved {} filtered properties.", filteredProperties.size());
        return filteredProperties.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    private void addBooleanSpecifications(Specification<Property> spec, FilterSearchPropertyDTO propertyDTO) {
        if (propertyDTO.getWifi() != null) {
            spec = spec.and(PropertySpecification.withWifi(propertyDTO.getWifi()));
        }
        if (propertyDTO.getTv() != null) {
            spec = spec.and(PropertySpecification.withTv(propertyDTO.getTv()));
        }
        if (propertyDTO.getSeparateBeds() != null) {
            spec = spec.and(PropertySpecification.withSeparateBeds(propertyDTO.getSeparateBeds()));
        }
        if (propertyDTO.getPrivateBath() != null) {
            spec = spec.and(PropertySpecification.withPrivateBath(propertyDTO.getPrivateBath()));
        }
        if (propertyDTO.getCookingFacilities() != null) {
            spec = spec.and(PropertySpecification.withCookingFacilities(propertyDTO.getCookingFacilities()));
        }
        if (propertyDTO.getRadio() != null) {
            spec = spec.and(PropertySpecification.withRadio(propertyDTO.getRadio()));
        }
        if (propertyDTO.getTowels() != null) {
            spec = spec.and(PropertySpecification.withTowels(propertyDTO.getTowels()));
        }
        if (propertyDTO.getExtraBedPossible() != null) {
            spec = spec.and(PropertySpecification.withExtraBedPossible(propertyDTO.getExtraBedPossible()));
        }
        if (propertyDTO.getBedLinen() != null) {
            spec = spec.and(PropertySpecification.withBedLinen(propertyDTO.getBedLinen()));
        }
        if (propertyDTO.getFridge() != null) {
            spec = spec.and(PropertySpecification.withFridge(propertyDTO.getFridge()));
        }
        if (propertyDTO.getCoffeeMachine() != null) {
            spec = spec.and(PropertySpecification.withCoffeeMachine(propertyDTO.getCoffeeMachine()));
        }
        if (propertyDTO.getMicrowave() != null) {
            spec = spec.and(PropertySpecification.withMicrowave(propertyDTO.getMicrowave()));
        }
        if (propertyDTO.getDishwasher() != null) {
            spec = spec.and(PropertySpecification.withDishwasher(propertyDTO.getDishwasher()));
        }
        if (propertyDTO.getWc() != null) {
            spec = spec.and(PropertySpecification.withWc(propertyDTO.getWc()));
        }
        if (propertyDTO.getTerrace() != null) {
            spec = spec.and(PropertySpecification.withTerrace(propertyDTO.getTerrace()));
        }
        if (propertyDTO.getKettle() != null) {
            spec = spec.and(PropertySpecification.withKettle(propertyDTO.getKettle()));
        }
        if (propertyDTO.getBathtub() != null) {
            spec = spec.and(PropertySpecification.withBathtub(propertyDTO.getBathtub()));
        }
        if (propertyDTO.getGarden() != null) {
            spec = spec.and(PropertySpecification.withGarden(propertyDTO.getGarden()));
        }
        if (propertyDTO.getCookingUtensils() != null) {
            spec = spec.and(PropertySpecification.withCookingUtensils(propertyDTO.getCookingUtensils()));
        }
        if (propertyDTO.getWashingMachine() != null) {
            spec = spec.and(PropertySpecification.withWashingMachine(propertyDTO.getWashingMachine()));
        }
        if (propertyDTO.getSelfCheckIn() != null) {
            spec = spec.and(PropertySpecification.withSelfCheckIn(propertyDTO.getSelfCheckIn()));
        }
        if (propertyDTO.getSmoking() != null) {
            spec = spec.and(PropertySpecification.withSmoking(propertyDTO.getSmoking()));
        }
        if (propertyDTO.getQuietLocation() != null) {
            spec = spec.and(PropertySpecification.withQuietLocation(propertyDTO.getQuietLocation()));
        }
        if (propertyDTO.getGoodTransportation() != null) {
            spec = spec.and(PropertySpecification.withGoodTransportation(propertyDTO.getGoodTransportation()));
        }
        if (propertyDTO.getShopsNearby() != null) {
            spec = spec.and(PropertySpecification.withShopsNearby(propertyDTO.getShopsNearby()));
        }
    }

    public PropertyDTO getPropertyById(Long id) {
        log.info("Fetching property with ID: {}", id);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return modelMapper.map(property, PropertyDTO.class);
    }

    public List<PropertyDTO> getPropertyByCity(String city) {
        log.info("Fetching properties in city: {}", city);
        List<Property> propertyList = propertyRepository.findByCity_Name(city);
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> get20Chepeastproperties() {
        log.info("Fetching 20 cheapest properties.");
        List<Property> propertyList = propertyRepository.find20Chepeast();
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> get20FavoriteProperties() {
        log.info("Fetching 20 favorite properties.");
        List<Property> propertyList = propertyRepository.find20Favorite();
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> get20LastProperties() {
        log.info("Fetching 20 last properties.");
        List<Property> propertyList = propertyRepository.find20Latest();
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<Property> findPropertiesWithinDistance(double cityLat, double cityLon, int distance) {
        // Step 1: Fetch all cities and filter only those within the specified distance
        List<City> nearbyCities = cityRepository.findAll().stream()
                .filter(city -> {
                    double otherCityLat = city.getLatitude();
                    double otherCityLon = city.getLongitude();
                    double distanceToCity = DistanceUtils.calculateDistance(cityLat, cityLon, otherCityLat, otherCityLon);
                    return distanceToCity <= distance;
                })
                .collect(Collectors.toList());

        // Step 2: If no nearby cities, return an empty list
        if (nearbyCities.isEmpty()) {
            return Collections.emptyList();
        }

        // Step 3: Find all properties in the nearby cities
        return propertyRepository.findByCityIn(nearbyCities);
    }

    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        log.info("Creating new property: {}", propertyDTO);

        Property property = modelMapper.map(propertyDTO, Property.class);

        // Fetch or create the city
        City city = cityRepository.findByName(propertyDTO.getCity().getName());
        property.setCity(city);
        property.setFullPrice(propertyDTO.getPrice());
        property.setCreatedAt(LocalDateTime.now());
        Property savedProperty = propertyRepository.save(property);

        log.info("Successfully created property with ID: {}", savedProperty.getId());

        // Ensure PropertyDTO contains the correct property ID
        PropertyDTO responseDTO = modelMapper.map(savedProperty, PropertyDTO.class);
        responseDTO.setId(savedProperty.getId()); // Explicitly set the property ID if needed

        return responseDTO;
    }


    public PropertyDTO addFavoriteProperty(FavoritePropertyDto propertyDto) {
        log.info("Updating favorite status for property ID: {}", propertyDto.getPropertyId());
        Property property = propertyRepository.findById(propertyDto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setIsFavorite(propertyDto.getIsFavorite());
        Property updatedProperty = propertyRepository.save(property);
        log.info("Successfully updated favorite status for property ID: {}", propertyDto.getPropertyId());
        return modelMapper.map(updatedProperty, PropertyDTO.class);
    }

    public PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO) {
        log.info("Updating property with ID: {}", id);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        modelMapper.map(propertyDTO, property);
        Property updatedProperty = propertyRepository.save(property);
        log.info("Successfully updated property with ID: {}", id);
        return modelMapper.map(updatedProperty, PropertyDTO.class);
    }

    public void deleteProperty(Long id) {
        log.info("Deleting property with ID: {}", id);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        propertyRepository.delete(property);
        log.info("Successfully deleted property with ID: {}", id);
    }

    public void deletePropertyByLink(String url) {
        log.info("Deleting property with URL: {}", url);

        Property property = propertyRepository.findBySocialMediaLink(url)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        propertyRepository.delete(property);

        log.info("Successfully deleted property with URL: {}", url);
    }

}
