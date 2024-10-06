package de.monteurzimmer.monteurzimmer_booking.photo_management.repository;

import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyPhotoRepository extends JpaRepository<PropertyPhoto, Long> {
    List<PropertyPhoto> findByPropertyId(Long propertyId);

    @Query(value = "SELECT * FROM property_photos WHERE property_id = ?1 AND is_primary = true", nativeQuery = true)
    PropertyPhoto findByPropertyIdAndIsPrimary(Long propertyId);

}

