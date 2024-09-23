package de.monteurzimmer.monteurzimmer_booking.property_management.repository;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
}
