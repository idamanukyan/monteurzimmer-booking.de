package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {

    public static Specification<Property> withCity(String city) {
        return (root, query, criteriaBuilder) -> {
            if (city == null || city.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("city").get("name"), city);
        };
    }

    public static Specification<Property> withNumberOfGuests(Integer numberOfGuests) {
        return (root, query, criteriaBuilder) -> {
            if (numberOfGuests == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("numberOfGuests"), numberOfGuests);
        };
    }

    public static Specification<Property> withPropertyType(String propertyType) {
        return (root, query, criteriaBuilder) -> {
            if (propertyType == null || propertyType.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("propertyType"), propertyType);
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

    public static Specification<Property> withPriceRange(Long minPrice, Long maxPrice) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("fullPrice"), BigDecimal.valueOf(minPrice)));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("fullPrice"), BigDecimal.valueOf(maxPrice)));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }


    public static Specification<Property> withRoomCount(Integer roomCount) {
        return (root, query, criteriaBuilder) -> {
            if (roomCount == 0) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("roomCount"), roomCount);
        };
    }

    public static Specification<Property> withWifi(boolean wlan) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wifi"), wlan);
    }

    public static Specification<Property> withTv(boolean tv) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("tv"), tv);
    }

    public static Specification<Property> withSeparateBeds(boolean getrennteBetten) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("separateBeds"), getrennteBetten);
    }

    public static Specification<Property> withPrivateBath(boolean privatesBad) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("privateBath"), privatesBad);
    }

    public static Specification<Property> withCookingFacilities(boolean kochmoglichkeit) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("cookingFacilities"), kochmoglichkeit);
    }

    public static Specification<Property> withRadio(boolean radio) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("radio"), radio);
    }

    public static Specification<Property> withTowels(boolean towels) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("towels"), towels);
    }

    public static Specification<Property> withExtraBedPossible(boolean extraBedPossible) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("extraBedPossible"), extraBedPossible);
    }

    public static Specification<Property> withBedLinen(boolean bedLinen) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("bedLinen"), bedLinen);
    }

    public static Specification<Property> withFridge(boolean fridge) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("fridge"), fridge);
    }

    public static Specification<Property> withCoffeeMachine(boolean coffeeMachine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("coffeeMachine"), coffeeMachine);
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
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("cookingUtensils"), cookingUtensils);
    }

    public static Specification<Property> withWashingMachine(boolean washingMachine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("washingMachine"), washingMachine);
    }

    public static Specification<Property> withSelfCheckIn(boolean selfCheckIn) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("selfCheckIn"), selfCheckIn);
    }

    public static Specification<Property> withSmoking(boolean smoking) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("smoking"), smoking);
    }

    public static Specification<Property> withQuietLocation(boolean quietLocation) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("quietLocation"), quietLocation);
    }

    public static Specification<Property> withGoodTransportation(boolean goodTransportation) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("goodTransportation"), goodTransportation);
    }

    public static Specification<Property> withShopsNearby(boolean shopsNearby) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("shopsNearby"), shopsNearby);
    }
}
