package de.monteurzimmer.monteurzimmer_booking.city_management.service;

import de.monteurzimmer.monteurzimmer_booking.city_management.entity.City;
import de.monteurzimmer.monteurzimmer_booking.city_management.entity.CityDto;
import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import org.modelmapper.ModelMapper;
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
import java.util.stream.Collectors;

@Service
public class CityService {

    private final LogEntryService logEntryService;
    private final CityRepository cityRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CityService(CityRepository cityRepository, LogEntryService logEntryService, ModelMapper modelMapper) {
        this.cityRepository = cityRepository;
        this.modelMapper = modelMapper;
        this.logEntryService = logEntryService;
    }

    public CityDto addCity(CityDto cityDto) {
        Optional<City> existingCity = Optional.ofNullable(cityRepository.findByName(cityDto.getName()));
        if (existingCity.isPresent()) {
            String message = "City with the name '" + cityDto.getName() + "' already exists.";
            logEntryService.log("error", message);
            throw new IllegalArgumentException(message);
        }

        City newCity = modelMapper.map(cityDto, City.class);
        City savedCity = cityRepository.save(newCity);
        return modelMapper.map(savedCity, CityDto.class);
    }

    public List<CityDto> getAllCities() {
        List<City> allCities = cityRepository.findAll();
        return allCities.stream().map(city -> modelMapper.map(city, CityDto.class)).collect(Collectors.toList());
    }

    public CityDto getCityById(Long id) {
        City city = cityRepository.findById(id).orElseThrow(() -> {
            String message = "City not found with ID: " + id;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        return modelMapper.map(city, CityDto.class);
    }

    public City markAsFavorite(Long cityId) {
        City city = cityRepository.findById(cityId).orElseThrow(() -> {
            String message = "City not found with ID: " + cityId;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        city.setIsFavorite(true);
        City updatedCity = cityRepository.save(city);
        return updatedCity;
    }

    public City unmarkAsFavorite(Long cityId) {
        City city = cityRepository.findById(cityId).orElseThrow(() -> {
            String message = "City not found with ID: " + cityId;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        city.setIsFavorite(false);
        City updatedCity = cityRepository.save(city);
        return updatedCity;
    }

    public List<CityDto> getFavoriteCities() {
        List<City> favoriteCities = cityRepository.findTop10ByIsFavoriteTrueOrderByIdDesc();
        return favoriteCities.stream().map(city -> modelMapper.map(city, CityDto.class)).collect(Collectors.toList());
    }

    public String storePhoto(MultipartFile photoFile) {
        if (photoFile == null || photoFile.isEmpty()) {
            logEntryService.log("error", "No file provided for upload.");
            throw new IllegalArgumentException("No file provided for upload.");
        }

        String uploadDir = "client/storage/upload/icons/city";
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
            logEntryService.log("error", "\"Could not store photo: {}" + fileName + e);
            throw new RuntimeException("Could not store photo: " + fileName, e);
        }
    }
}
