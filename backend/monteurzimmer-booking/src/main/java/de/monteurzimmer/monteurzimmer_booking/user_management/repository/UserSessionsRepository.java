package de.monteurzimmer.monteurzimmer_booking.user_management.repository;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSessionsRepository extends JpaRepository<UserSession, Long> {
}
