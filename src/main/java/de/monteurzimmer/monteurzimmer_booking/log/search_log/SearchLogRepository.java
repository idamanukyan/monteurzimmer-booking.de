package de.monteurzimmer.monteurzimmer_booking.log.search_log;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SearchLogRepository extends JpaRepository<SearchLog, Long> {

    List<SearchLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

}

