package de.monteurzimmer.monteurzimmer_booking.user_management.dto.login;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmailVerificationDTO {
    private Long id;
    private Long userId;
    private String verificationCode;
    private LocalDateTime expiryTimestamp;
    private boolean isVerified;
}
