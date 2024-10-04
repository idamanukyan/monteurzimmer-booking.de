package de.monteurzimmer.monteurzimmer_booking.admin_management.service;

import de.monteurzimmer.monteurzimmer_booking.city_management.repository.CityRepository;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.PropertyRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    /*public void addFavoriteCity(Long adminId, String cityName) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        City city = cityRepository.findByName(cityName)
                .orElseThrow(() -> new RuntimeException("City not found"));

        .getFavoriteCities().add(city);
    }

    public void addFavoriteProperty(Long adminId, Long propertyId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        admin.getFavoriteProperties().add(property);
        adminRepository.save(admin);
    }*/
}
