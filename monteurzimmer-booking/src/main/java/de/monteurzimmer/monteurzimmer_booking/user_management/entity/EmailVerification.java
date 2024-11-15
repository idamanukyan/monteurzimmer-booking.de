package de.monteurzimmer.monteurzimmer_booking.user_management.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "email_verifications")
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "expiry_timestamp")
    private LocalDateTime expiryTimestamp;

    @Column(name = "is_verified")
    private Boolean isVerified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public LocalDateTime getExpiryTimestamp() {
        return expiryTimestamp;
    }

    public void setExpiryTimestamp(LocalDateTime expiryTimestamp) {
        this.expiryTimestamp = expiryTimestamp;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}

