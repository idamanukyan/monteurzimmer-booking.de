package de.monteurzimmer.monteurzimmer_booking.user_management.util.exception;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException {

    private final HttpStatus status;

    public ApplicationException(final HttpStatus status, final String message) {
        super(message);
        this.status = status;
    }


    public String getMessage() {
        return super.getMessage();
    }

    public HttpStatus status() {
        return this.status;
    }
}
