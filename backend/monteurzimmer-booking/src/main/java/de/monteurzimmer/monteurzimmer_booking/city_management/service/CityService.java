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
        logEntryService.log("info", "Attempting to add city: " + cityDto.getName());

        Optional<City> existingCity = Optional.ofNullable(cityRepository.findByName(cityDto.getName()));
        if (existingCity.isPresent()) {
            String message = "City with the name '" + cityDto.getName() + "' already exists.";
            logEntryService.log("error", message);
            throw new IllegalArgumentException(message);
        }

        City newCity = modelMapper.map(cityDto, City.class);
        newCity.setPhoto(cityDto.getPhoto());
        City savedCity = cityRepository.save(newCity);
        logEntryService.log("info", "City added successfully: " + savedCity.getName());
        return modelMapper.map(savedCity, CityDto.class);
    }

    public List<CityDto> getAllCities() {
        logEntryService.log("info", "Fetching all cities.");
        List<City> allCities = cityRepository.findAll();
        logEntryService.log("info", "Retrieved " + allCities.size() + " cities.");
        return allCities.stream()
                .map(city -> modelMapper.map(city, CityDto.class))
                .collect(Collectors.toList());
    }

    public CityDto getCityById(Long id) {
        logEntryService.log("info", "Fetching city with ID: " + id);
        City city = cityRepository.findById(id).orElseThrow(() -> {
            String message = "City not found with ID: " + id;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        logEntryService.log("info", "City found: " + city.getName());
        return modelMapper.map(city, CityDto.class);
    }

    public City markAsFavorite(Long cityId) {
        logEntryService.log("info", "Marking city with ID: " + cityId + " as favorite.");
        City city = cityRepository.findById(cityId).orElseThrow(() -> {
            String message = "City not found with ID: " + cityId;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        city.setIsFavorite(true);
        City updatedCity = cityRepository.save(city);
        logEntryService.log("info", "City with ID: " + cityId + " marked as favorite.");
        return updatedCity;
    }

    public City unmarkAsFavorite(Long cityId) {
        logEntryService.log("info", "Unmarking city with ID: " + cityId + " as favorite.");
        City city = cityRepository.findById(cityId).orElseThrow(() -> {
            String message = "City not found with ID: " + cityId;
            logEntryService.log("error", message);
            return new RuntimeException(message);
        });
        city.setIsFavorite(false);
        City updatedCity = cityRepository.save(city);
        logEntryService.log("info", "City with ID: " + cityId + " unmarked as favorite.");
        return updatedCity;
    }

    public List<CityDto> getFavoriteCities() {
        logEntryService.log("info", "Fetching favorite cities.");
        List<City> favoriteCities = cityRepository.findTop10ByIsFavoriteTrueOrderByIdDesc();
        logEntryService.log("info", "Retrieved " + favoriteCities.size() + " favorite cities.");
        return favoriteCities.stream()
                .map(city -> modelMapper.map(city, CityDto.class))
                .collect(Collectors.toList());
    }

    public String storePhoto(MultipartFile photoFile) {
        logEntryService.log("info", "Storing photo.");

        if (photoFile == null || photoFile.isEmpty()) {
            logEntryService.log("error", "No file provided for upload.");
            throw new IllegalArgumentException("No file provided for upload.");
        }

        String uploadDir = "client/public/city";
        String fileName = photoFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                logEntryService.log("info", "Created directories for photo upload.");
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            logEntryService.log("info", "Photo stored successfully with filename: " + fileName);
            return fileName;
        } catch (IOException e) {
            logEntryService.log("error", "Could not store photo: " + fileName + ". Error: " + e.getMessage());
            throw new RuntimeException("Could not store photo: " + fileName, e);
        }
    }
}

