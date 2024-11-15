package de.monteurzimmer.monteurzimmer_booking.user_management.repository;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    default Optional<Role> findAdminRole() {
        return findByName("ADMIN");
    }

    default Optional<Role> findUserRole() {
        return findByName("USER");
    }

    boolean existsByName(String name);


}

