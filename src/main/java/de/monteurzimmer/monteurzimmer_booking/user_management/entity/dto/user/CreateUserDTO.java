package de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user;

import lombok.Data;

@Data
public class CreateUserDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
}
