package de.monteurzimmer.monteurzimmer_booking.user_management.controller;

import lombok.Getter;

@Getter
public class AuthenticationRequest {
    // Getters and setters
    private String email;
    private String password;

    // Default constructor (required for JSON deserialization)
    public AuthenticationRequest() {}

    public AuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}