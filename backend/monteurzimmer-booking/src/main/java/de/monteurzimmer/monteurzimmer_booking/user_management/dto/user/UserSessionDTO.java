package de.monteurzimmer.monteurzimmer_booking.user_management.dto.user;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserSessionDTO {
    private Long id;
    private Long userId;
    private boolean isActive;
    private LocalDateTime expiryTimestamp;
}
