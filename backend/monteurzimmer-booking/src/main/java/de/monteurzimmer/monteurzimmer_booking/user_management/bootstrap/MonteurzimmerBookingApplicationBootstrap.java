package de.monteurzimmer.monteurzimmer_booking.user_management.bootstrap;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Permission;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.PermissionRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RoleRepository;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class MonteurzimmerBookingApplicationBootstrap {

    private static final String admin_role = "ADMIN";
    private static final String customer_role = "USER";
    private static final String moderator_role = "MODERATOR";

    private final RoleRepository repository;
    private final PermissionRepository permissionRepository;

    public MonteurzimmerBookingApplicationBootstrap(final RoleRepository repository,
                                                    final PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
        this.repository = repository;
    }

    public void init() {

        if (!this.repository.existsByName(admin_role)) {
            Role adminRole = new Role();
            adminRole.setName(admin_role);
            adminRole.setPermissions(this.adminPermissions());
            this.repository.save(adminRole);
        }

        if (!this.repository.existsByName(customer_role)) {
            Role customerRole = new Role();
            customerRole.setName(customer_role);
            customerRole.setPermissions(this.customerPermissions());
            this.repository.save(customerRole);
        }

        if (!this.repository.existsByName(moderator_role)) {
            Role moderatorRole = new Role();
            moderatorRole.setName(moderator_role);
            moderatorRole.setPermissions(this.moderatorPermissions());
            this.repository.save(moderatorRole);
        }
    }

    private Set<Permission> adminPermissions() {
        return this.permissionRepository.findAllByNameIn(
                Set.of("CREATE_USER", "EDIT_USER", "DELETE_USER", "VIEW_USERS",
                        "MANAGE_ROLES", "ADD_FAVORITE_CITIES", "ADD_FAVORITE_PROPERTIES")
        );
    }


    private Set<Permission> customerPermissions() {
        return this.permissionRepository.findAllByNameIn(
                Set.of("")
        );
    }

    private Set<Permission> moderatorPermissions() {
        return this.permissionRepository.findAllByNameIn(
                Set.of("CREATE_USER", "EDIT_USER", "DELETE_USER", "VIEW_USERS",
                        "ADD_FAVORITE_CITIES", "ADD_FAVORITE_PROPERTIES"
                )
        );
    }
}
