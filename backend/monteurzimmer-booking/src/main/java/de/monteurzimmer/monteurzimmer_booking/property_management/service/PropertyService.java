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

        if (propertyDTO.getCity().getName() != null) {
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
        if (propertyDTO.getRoomCount() != null) {
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
            spec = spec.and(PropertySpecification.withWifi(true));
        }
        if (propertyDTO.getTv() != null) {
            spec = spec.and(PropertySpecification.withTv(true));
        }
        if (propertyDTO.getSeparateBeds() != null) {
            spec = spec.and(PropertySpecification.withSeparateBeds(true));
        }
        if (propertyDTO.getPrivateBath() != null) {
            spec = spec.and(PropertySpecification.withPrivateBath(true));
        }
        if (propertyDTO.getCookingFacilities() != null) {
            spec = spec.and(PropertySpecification.withCookingFacilities(true));
        }
        if (propertyDTO.getRadio() != null) {
            spec = spec.and(PropertySpecification.withRadio(true));
        }
        if (propertyDTO.getTowels() != null) {
            spec = spec.and(PropertySpecification.withTowels(true));
        }
        if (propertyDTO.getExtraBedPossible() != null) {
            spec = spec.and(PropertySpecification.withExtraBedPossible(true));
        }
        if (propertyDTO.getBedLinen() != null) {
            spec = spec.and(PropertySpecification.withBedLinen(true));
        }
        if (propertyDTO.getFridge() != null) {
            spec = spec.and(PropertySpecification.withFridge(true));
        }
        if (propertyDTO.getCoffeeMachine() != null) {
            spec = spec.and(PropertySpecification.withCoffeeMachine(true));
        }
        if (propertyDTO.getMicrowave() != null) {
            spec = spec.and(PropertySpecification.withMicrowave(true));
        }
        if (propertyDTO.getDishwasher() != null) {
            spec = spec.and(PropertySpecification.withDishwasher(true));
        }
        if (propertyDTO.getWc() != null) {
            spec = spec.and(PropertySpecification.withWc(true));
        }
        if (propertyDTO.getTerrace() != null) {
            spec = spec.and(PropertySpecification.withTerrace(true));
        }
        if (propertyDTO.getKettle() != null) {
            spec = spec.and(PropertySpecification.withKettle(true));
        }
        if (propertyDTO.getBathtub() != null) {
            spec = spec.and(PropertySpecification.withBathtub(true));
        }
        if (propertyDTO.getGarden() != null) {
            spec = spec.and(PropertySpecification.withGarden(true));
        }
        if (propertyDTO.getCookingUtensils() != null) {
            spec = spec.and(PropertySpecification.withCookingUtensils(true));
        }
        if (propertyDTO.getWashingMachine() != null) {
            spec = spec.and(PropertySpecification.withWashingMachine(true));
        }
        if (propertyDTO.getSelfCheckIn() != null) {
            spec = spec.and(PropertySpecification.withSelfCheckIn(true));
        }
        if (propertyDTO.getSmoking() != null) {
            spec = spec.and(PropertySpecification.withSmoking(true));
        }
        if (propertyDTO.getQuietLocation() != null) {
            spec = spec.and(PropertySpecification.withQuietLocation(true));
        }
        if (propertyDTO.getGoodTransportation() != null) {
            spec = spec.and(PropertySpecification.withGoodTransportation(true));
        }
        if (propertyDTO.getShopsNearby() != null) {
            spec = spec.and(PropertySpecification.withShopsNearby(true));
        }
    }

    public PropertyDTO getPropertyById(Long id) {
        log.info("Fetching property with ID: {}", id);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return modelMapper.map(property, PropertyDTO.class);
    }

    public List<PropertyDTO> getPropertyByCityName(String name) {
        log.info("Fetching property with city name: {}", name);
        List<Property> propertyList = propertyRepository.findByCity_Name(name);
        return propertyList.stream()
                .map(property -> modelMapper.map(property, PropertyDTO.class))
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> getPropertyByCity(City city) {
        log.info("Fetching properties in city: {}", city);
        List<Property> propertyList = propertyRepository.findByCity_Name(city.getName());
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

    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        log.info("Creating new property: {}", propertyDTO);
        Property property = modelMapper.map(propertyDTO, Property.class);
        Property savedProperty = propertyRepository.save(property);
        log.info("Successfully created property with ID: {}", savedProperty.getId());
        return modelMapper.map(savedProperty, PropertyDTO.class);
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

    /*public List<Property> findPropertiesWithinDistance(double cityLat, double cityLon, int distance, String city_name) {
        List<Property> allProperties = propertyRepository.findByCity_Name(city_name); // Fetch properties with their cities

        return allProperties.stream()
                .filter(property -> {
                    City city = property.getCity();
                    if (city != null) {
                        double propertyLat = city.getLatitude();
                        double propertyLon = city.getLongitude();
                        double propertyDistance = DistanceUtils.calculateDistance(cityLat, cityLon, propertyLat, propertyLon);

                        return propertyDistance <= distance;
                    }
                    return false;
                })
                .collect(Collectors.toList());
    }*/

    public List<Property> findPropertiesWithinDistance(double cityLat, double cityLon, int distance, String cityName) {
        log.debug("Finding nearby cities for lat: {}, lon: {}, within {} km", cityLat, cityLon, distance);
        List<City> allCities = cityRepository.findAll();
        log.debug("Total cities found: {}", allCities.size());

        List<City> nearbyCities = allCities.stream()
                .filter(city -> {
                    double otherCityLat = city.getLatitude();
                    double otherCityLon = city.getLongitude();
                    double distanceToCity = DistanceUtils.calculateDistance(cityLat, cityLon, otherCityLat, otherCityLon);
                    log.debug("Distance from {} to {} is: {} km", city.getName(), distanceToCity);
                    return distanceToCity <= distance;
                })
                .collect(Collectors.toList());

        log.debug("Nearby cities found: {}", nearbyCities.size());

        // Step 2: If no nearby cities, return an empty list
        if (nearbyCities.isEmpty()) {
            return Collections.emptyList();
        }

        // Step 3: Find all properties in the nearby cities
        return propertyRepository.findByCityIn(nearbyCities);
    }


}
