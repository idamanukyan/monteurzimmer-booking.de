package de.monteurzimmer.monteurzimmer_booking.user_management.repository;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    // Additional custom queries can be defined here if needed
}

