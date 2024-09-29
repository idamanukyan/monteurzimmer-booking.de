package de.monteurzimmer.monteurzimmer_booking.user_management.bootstrap;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RoleRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Set;

@Component
public class CreateAdmin {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;


    public CreateAdmin(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    public void createAdmin() {
        if (userRepository.findByEmail("idamyan01@gmail.com").isEmpty()) {

            User user = new User();
            user.setName("admin");
            user.setSurname("admin");
            user.setEmail("idamyan01@gmail.com");
            user.setPassword("hgyhno776nok");
            Role role = roleRepository.findAdminRole().get();
            user.setRoles(Set.of(role));
            user.setCreated(LocalDateTime.now());
            userRepository.save(user);

        }
    }

}
