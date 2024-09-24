package de.monteurzimmer.monteurzimmer_booking.property_management.repository;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.RelatedProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelatedPropertyRepository extends JpaRepository<RelatedProperties, Long> {
}
