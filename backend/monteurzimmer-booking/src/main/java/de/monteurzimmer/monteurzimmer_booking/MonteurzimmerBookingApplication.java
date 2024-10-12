package de.monteurzimmer.monteurzimmer_booking;

import de.monteurzimmer.monteurzimmer_booking.user_management.bootstrap.CreateAdmin;
import de.monteurzimmer.monteurzimmer_booking.user_management.bootstrap.MonteurzimmerBookingApplicationBootstrap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableScheduling
public class MonteurzimmerBookingApplication implements CommandLineRunner {

    private MonteurzimmerBookingApplicationBootstrap bootstrap;

    private CreateAdmin createAdmin;

    public static void main(String[] args) {
        SpringApplication.run(MonteurzimmerBookingApplication.class, args);
    }

    @Override
    public void run(String... args) {
        this.bootstrap.init();
        this.createAdmin.createAdmin();
    }

    @Autowired
    public void setBootstrap(MonteurzimmerBookingApplicationBootstrap bootstrap, CreateAdmin createAdmin) {
        this.bootstrap = bootstrap;
        this.createAdmin = createAdmin;
    }

}

//cd C:\Users\Admin\Desktop\monteurzimmer-booking.de-final\client
//npm start