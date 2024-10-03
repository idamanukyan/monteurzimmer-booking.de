package de.monteurzimmer.monteurzimmer_booking.admin_management.city_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping
    public ResponseEntity<City> addCity(@RequestParam("name") String name,
                                        @RequestParam("isFavorite") Boolean isFavorite,
                                        @RequestParam("photoFile") MultipartFile photoFile) {

        City city = new City();
        city.setName(name);
        city.setIsFavorite(isFavorite);

        String photoUrl = cityService.storePhoto(photoFile);
        city.setPhoto(photoUrl);

        City createdCity = cityService.addCity(city);
        return ResponseEntity.ok(createdCity);
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<City>> getFavoriteCities() {
        List<City> favoriteCities = cityService.getFavoriteCities();
        return ResponseEntity.ok(favoriteCities);
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<City> markAsFavorite(@PathVariable Long id) {
        City city = cityService.markAsFavorite(id);
        return ResponseEntity.ok(city);
    }

    @PostMapping("/{id}/unfavorite")
    public ResponseEntity<City> unmarkAsFavorite(@PathVariable Long id) {
        City city = cityService.unmarkAsFavorite(id);
        return ResponseEntity.ok(city);
    }
}
