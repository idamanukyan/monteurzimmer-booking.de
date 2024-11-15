package de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
}
