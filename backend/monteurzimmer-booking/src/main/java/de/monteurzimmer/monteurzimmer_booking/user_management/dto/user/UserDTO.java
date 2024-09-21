package de.monteurzimmer.monteurzimmer_booking.user_management.dto.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String address;
    private String profilePicture;
    private boolean isVerified;
}

