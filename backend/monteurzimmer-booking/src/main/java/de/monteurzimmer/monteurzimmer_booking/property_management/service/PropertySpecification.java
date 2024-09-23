package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class PropertySpecification {

    public static Specification<Property> withCity(String city) {
        return (root, query, criteriaBuilder) -> {
            if (city == null || city.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("city"), city);
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
                return criteriaBuilder.conjunction(); // Assuming 0 means "All"
            }
            return criteriaBuilder.equal(root.get("roomCount"), roomCount);
        };
    }

    public static Specification<Property> withWlan(boolean wlan) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wlan"), wlan);
    }

    public static Specification<Property> withTv(boolean tv) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("tv"), tv);
    }

    public static Specification<Property> withGetrennteBetten(boolean getrennteBetten) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("getrennteBetten"), getrennteBetten);
    }

    public static Specification<Property> withPrivatesBad(boolean privatesBad) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("privatesBad"), privatesBad);
    }

    public static Specification<Property> withKochmoglichkeit(boolean kochmoglichkeit) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kochmoglichkeit"), kochmoglichkeit);
    }

    public static Specification<Property> withRadio(boolean radio) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("radio"), radio);
    }

    public static Specification<Property> withHandtucherInkl(boolean handtucherInkl) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("handtucherInkl"), handtucherInkl);
    }

    public static Specification<Property> withZustellbettMoglich(boolean zustellbettMoglich) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("zustellbettMoglich"), zustellbettMoglich);
    }

    public static Specification<Property> withBettwascheInkl(boolean bettwascheInkl) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("bettwascheInkl"), bettwascheInkl);
    }

    public static Specification<Property> withKuehlschrank(boolean kuehlschrank) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kuehlschrank"), kuehlschrank);
    }

    public static Specification<Property> withKaffeemaschine(boolean kaffeemaschine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kaffeemaschine"), kaffeemaschine);
    }

    public static Specification<Property> withMikrowelle(boolean mikrowelle) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("mikrowelle"), mikrowelle);
    }

    public static Specification<Property> withSpuelmaschine(boolean spuelmaschine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("spuelmaschine"), spuelmaschine);
    }

    public static Specification<Property> withWc(boolean wc) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wc"), wc);
    }

    public static Specification<Property> withTerrasse(boolean terrasse) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("terrasse"), terrasse);
    }

    public static Specification<Property> withWasserkocher(boolean wasserkocher) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("wasserkocher"), wasserkocher);
    }

    public static Specification<Property> withBadewanne(boolean badewanne) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("badewanne"), badewanne);
    }

    public static Specification<Property> withGarten(boolean garten) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("garten"), garten);
    }

    public static Specification<Property> withKochutensilien(boolean kochutensilien) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("kochutensilien"), kochutensilien);
    }

    public static Specification<Property> withWaschmaschine(boolean waschmaschine) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("waschmaschine"), waschmaschine);
    }

    public static Specification<Property> withEigenstandigerCheckIn(boolean eigenstandigerCheckIn) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("eigenstandigerCheckIn"), eigenstandigerCheckIn);
    }

    public static Specification<Property> withRaucher(boolean raucher) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("raucher"), raucher);
    }

    public static Specification<Property> withRuhigeLage(boolean ruhigeLage) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("ruhigeLage"), ruhigeLage);
    }

    public static Specification<Property> withGuteVerkehrsanbindung(boolean guteVerkehrsanbindung) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("guteVerkehrsanbindung"), guteVerkehrsanbindung);
    }

    public static Specification<Property> withGeschaefteInDerNahe(boolean geschaefteInDerNahe) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("geschaefteInDerNahe"), geschaefteInDerNahe);
    }
}
