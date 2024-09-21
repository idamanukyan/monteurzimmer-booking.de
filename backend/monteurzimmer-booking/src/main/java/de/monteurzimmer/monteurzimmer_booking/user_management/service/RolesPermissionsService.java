package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.RolePermission;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RolesPermissionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesPermissionsService {

    @Autowired
    private RolesPermissionsRepository rolesPermissionsRepository;

    public RolePermission createRolesPermissions(RolePermission rolesPermissions) {
        return rolesPermissionsRepository.save(rolesPermissions);
    }
}

