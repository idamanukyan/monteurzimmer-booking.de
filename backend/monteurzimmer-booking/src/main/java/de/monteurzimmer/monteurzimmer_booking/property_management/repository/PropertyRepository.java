package de.monteurzimmer.monteurzimmer_booking.property_management.repository;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.FilterSearchPropertyDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

    Page<Property> findByCity_Name(String city, Pageable pageable);

    @Query(value = "SELECT * FROM properties p ORDER BY p.price_per_night ASC LIMIT 20", nativeQuery = true)
    List<Property> find20Chepeast();

    @Query(value = "SELECT * FROM properties p where p.is_favorite=true LIMIT 20", nativeQuery = true)
    List<Property> find20Favorite();

    @Query(value = "SELECT * FROM properties p ORDER BY p.created_at DESC LIMIT 20", nativeQuery = true)
    List<Property> find20Latest();

    List<Property> findByCityIn(List<City> cities);

    Optional<Property> findBySocialMediaLink(String url);

    Page<Property> findFilteredProperties(FilterSearchPropertyDTO filterSearchPropertyDTO, Pageable pageable);


}
