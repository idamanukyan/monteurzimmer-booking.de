package de.monteurzimmer.monteurzimmer_booking.photo_management.repository;

import de.monteurzimmer.monteurzimmer_booking.photo_management.entity.PropertyPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyPhotoRepository extends JpaRepository<PropertyPhoto, Long> {
    List<PropertyPhoto> findByPropertyPropertyId(Long propertyId);
}

