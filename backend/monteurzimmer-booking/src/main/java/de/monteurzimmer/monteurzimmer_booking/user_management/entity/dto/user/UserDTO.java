package de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user;

import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String address;
    private String profilePicture;
    private boolean isVerified;
    private boolean hasAdminApproved;
    private String socialMediaProvider;
    private String socialMediaId;
}

