package de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String name;
    private String surname;
    private String phoneNumber;
    private String address;
    private String profilePicture;
}
