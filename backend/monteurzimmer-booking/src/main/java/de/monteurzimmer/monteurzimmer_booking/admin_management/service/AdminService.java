package de.monteurzimmer.monteurzimmer_booking.admin_management.service;

import de.monteurzimmer.monteurzimmer_booking.admin_management.entity.AdminDTO;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RoleRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

   /* public AdminDTO createSuperAdmin(AdminDTO adminDTO) {
        Role superAdminRole = roleRepository.findByName("ADMIN").get();
        return createAdmin(adminDTO, "ADMIN");
    }*/

/*    public AdminDTO createAdmin(AdminDTO adminDTO, String role) {
        User admin = new User();
        admin.setName(adminDTO.getName());
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(adminDTO.getPassword());
        Role adminRole = roleRepository.findByName(role).get();
        admin.setRoles(adminRole);

        User savedAdmin = userRepository.save(admin);
        return new AdminDTO(savedAdmin.getId(), savedAdmin.getName(), savedAdmin.getEmail(),
                savedAdmin.getRoles().getName());
    }*/
}
