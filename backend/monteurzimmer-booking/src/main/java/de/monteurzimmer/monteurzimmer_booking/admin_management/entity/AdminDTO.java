package de.monteurzimmer.monteurzimmer_booking.admin_management.entity;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import lombok.Data;

@Data
public class AdminDTO {

    private Long id;
    private String name;
    private String email;
    private String password;
    private Role role;
}
