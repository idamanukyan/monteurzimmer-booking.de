package de.monteurzimmer.monteurzimmer_booking.city_management.repository;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    City findByName(String name);

    List<City> findTop10ByIsFavoriteTrueOrderByIdDesc();

}
