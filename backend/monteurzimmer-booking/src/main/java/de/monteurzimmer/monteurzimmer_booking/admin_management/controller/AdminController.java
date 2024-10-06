package de.monteurzimmer.monteurzimmer_booking.admin_management.controller;

import de.monteurzimmer.monteurzimmer_booking.admin_management.service.AdminService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /*@PostMapping("/favorite-cities/add")
    public ResponseEntity<String> addFavoriteCity(@RequestParam Long adminId, @RequestParam String cityName) {
        adminService.addFavoriteCity(adminId, cityName);
        return ResponseEntity.ok("Favorite city added successfully!");
    }

    @PostMapping("/favorite-properties/add")
    public ResponseEntity<String> addFavoriteProperty(@RequestParam Long adminId, @RequestParam Long propertyId) {
        adminService.addFavoriteProperty(adminId, propertyId);
        return ResponseEntity.ok("Favorite property added successfully!");
    }
*/
}
