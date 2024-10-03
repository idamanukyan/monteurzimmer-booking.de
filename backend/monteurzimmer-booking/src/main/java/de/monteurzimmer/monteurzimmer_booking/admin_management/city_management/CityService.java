package de.monteurzimmer.monteurzimmer_booking.admin_management.city_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    public String storePhoto(MultipartFile photoFile) {
        String uploadDir = "storage/upload/icons/city";

        String fileName = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return filePath.toString();
        } catch (IOException e) {
            throw new IllegalArgumentException("Could not store photo: " + fileName, e);
        }
    }
}
