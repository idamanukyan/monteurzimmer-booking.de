package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PropertySpecification {


    public static CityRepository cityRepository;

    public PropertySpecification(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public static Specification<Property> withCity(City city) {
        return (root, query, criteriaBuilder) -> {
            if (city == null || city.getId() == null) {
                return criteriaBuilder.conjunction();
            }
            // Ensure the city is not transient; fetch from the database if needed
            City persistedCity = city.getId() != null ? city : cityRepository.findById(city.getId()).orElse(null);
            return criteriaBuilder.equal(root.get("city"), persistedCity);
        };
    }

    public static Specification<Property> withNumberOfGuests(Integer numberOfGuests) {
        return (root, query, criteriaBuilder) -> {
            if (numberOfGuests == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("number_of_guests"), numberOfGuests);
        };
    }

    public static Specification<Property> withPropertyType(String propertyType) {
        return (root, query, criteriaBuilder) -> {
            if (propertyType == null || propertyType.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("property_type"), propertyType);
        };
    }

    public static Specification<Property> withNeighborhood(String neighborhood) {
        return (root, query, criteriaBuilder) -> {
            if (neighborhood == null || neighborhood.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("neighborhood"), neighborhood);
        };
    }

    public static Specification<Property> withMinPrice(Long minPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), BigDecimal.valueOf(minPrice));
        };
    }

    public static Specification<Property> withMaxPrice(Long maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (maxPrice == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("price"), BigDecimal.valueOf(maxPrice));
        };
    }

    public static Specification<Property> withRoomCount(Integer roomCount) {
        return (root, query, criteriaBuilder) -> {
            if (roomCount == 0) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("room_count"), roomCount);
        };
    }

    public static Specification<Property> withWifi(boolean wlan) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wifi"), wlan);
    }

    public static Specification<Property> withTv(boolean tv) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("tv"), tv);
    }

    public static Specification<Property> withSeparateBeds(boolean getrennteBetten) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("separate_beds"), getrennteBetten);
    }

    public static Specification<Property> withPrivateBath(boolean privatesBad) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("private_bath"), privatesBad);
    }

    public static Specification<Property> withCookingFacilities(boolean kochmoglichkeit) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("cooking_facilities"), kochmoglichkeit);
    }

    public static Specification<Property> withRadio(boolean radio) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("radio"), radio);
    }

    public static Specification<Property> withTowels(boolean towels) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("towels"), towels);
    }

    public static Specification<Property> withExtraBedPossible(boolean extraBedPossible) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("extra_bed_possible"), extraBedPossible);
    }

    public static Specification<Property> withBedLinen(boolean bedLinen) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("bed_linen"), bedLinen);
    }

    public static Specification<Property> withFridge(boolean fridge) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("fridge"), fridge);
    }

    public static Specification<Property> withCoffeeMachine(boolean coffeeMachine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("coffee_machine"), coffeeMachine);
    }

    public static Specification<Property> withMicrowave(boolean microwave) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("microwave"), microwave);
    }

    public static Specification<Property> withDishwasher(boolean dishwasher) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("dishwasher"), dishwasher);
    }

    public static Specification<Property> withWc(boolean wc) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wc"), wc);
    }

    public static Specification<Property> withTerrace(boolean terrace) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("terrace"), terrace);
    }

    public static Specification<Property> withKettle(boolean kettle) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kettle"), kettle);
    }

    public static Specification<Property> withBathtub(boolean bathtub) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("bathtub"), bathtub);
    }

    public static Specification<Property> withGarden(boolean garden) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("garden"), garden);
    }

    public static Specification<Property> withCookingUtensils(boolean cookingUtensils) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("cooking_utensils"), cookingUtensils);
    }

    public static Specification<Property> withWashingMachine(boolean washingMachine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("washing_machine"), washingMachine);
    }

    public static Specification<Property> withSelfCheckIn(boolean selfCheckIn) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("self_check_in"), selfCheckIn);
    }

    public static Specification<Property> withSmoking(boolean smoking) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("smoking"), smoking);
    }

    public static Specification<Property> withQuietLocation(boolean quietLocation) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("quiet_location"), quietLocation);
    }

    public static Specification<Property> withGoodTransportation(boolean goodTransportation) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("good_transportation"), goodTransportation);
    }

    public static Specification<Property> withShopsNearby(boolean shopsNearby) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("shops_nearby"), shopsNearby);
    }
}
