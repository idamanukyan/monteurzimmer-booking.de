package de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.login;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PasswordResetDTO {
    private Long id;
    private Long userId;
    private String resetCode;
    private LocalDateTime expiryTimestamp;
    private boolean isReset;
}
