package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.RoleUser;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RolesUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesUsersService {

    @Autowired
    private RolesUsersRepository rolesUsersRepository;

    public RoleUser createRolesUsers(RoleUser rolesUsers) {
        return rolesUsersRepository.save(rolesUsers);
    }
}

