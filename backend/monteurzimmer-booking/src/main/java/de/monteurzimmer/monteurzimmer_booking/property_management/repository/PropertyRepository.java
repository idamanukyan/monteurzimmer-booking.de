package de.monteurzimmer.monteurzimmer_booking.property_management.repository;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

    List<Property> findByCity(String city);

    @Query(value = "SELECT * FROM properties p ORDER BY p.price_per_night ASC LIMIT 20", nativeQuery = true)
    List<Property> find20Chepeast();

}
