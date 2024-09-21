package de.monteurzimmer.monteurzimmer_booking.user_management.repository;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailVerificationsRepository extends JpaRepository<EmailVerification, Long> {
    // Additional custom queries can be defined here if needed
}
