package de.monteurzimmer.monteurzimmer_booking.admin_management.city_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public City addCity(City city) {
        Optional<City> existingCity = Optional.ofNullable(cityRepository.findByName(city.getName()));

        if (existingCity.isPresent()) {
            throw new IllegalArgumentException("City with the name '" + city.getName() + "' already exists.");
        }

        City savedCity = new City();
        savedCity.setName(city.getName());
        savedCity.setIsFavorite(city.getIsFavorite());

        return cityRepository.save(savedCity);
    }


    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City markAsFavorite(Long cityId) {
        City city = cityRepository.findById(cityId).orElseThrow(() -> new RuntimeException("City not found"));
        city.setIsFavorite(true);
        return cityRepository.save(city);
    }

    public City unmarkAsFavorite(Long cityId) {
        City city = cityRepository.findById(cityId).orElseThrow(() -> new RuntimeException("City not found"));
        city.setIsFavorite(false);
        return cityRepository.save(city);
    }

    public List<City> getFavoriteCities() {
        return cityRepository.findByIsFavoriteTrue();
    }
}
