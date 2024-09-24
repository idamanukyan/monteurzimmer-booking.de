package de.monteurzimmer.monteurzimmer_booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MonteurzimmerBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonteurzimmerBookingApplication.class, args);
    }

}
