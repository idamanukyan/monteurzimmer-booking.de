package de.monteurzimmer.monteurzimmer_booking.user_management.repository;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Additional custom queries can be defined here if needed
}

