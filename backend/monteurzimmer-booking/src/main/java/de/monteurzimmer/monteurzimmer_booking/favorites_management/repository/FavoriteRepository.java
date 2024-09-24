package de.monteurzimmer.monteurzimmer_booking.favorites_management.repository;

import de.monteurzimmer.monteurzimmer_booking.favorites_management.entity.Favorite;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.Property;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    List<Favorite> findBySessionId(String sessionId);

    Optional<Favorite> findByUserAndProperty(User user, Property property);

    Optional<Favorite> findBySessionIdAndProperty(String sessionId, Property property);
}
