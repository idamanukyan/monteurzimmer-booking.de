package de.monteurzimmer.monteurzimmer_booking.contact_us;

import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private LogEntryService logEntryService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody ContactFormDTO contactForm) {
        try {
            emailService.sendContactEmail(contactForm);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email: " + e.getMessage());
        }
    }

    @GetMapping("/all-forms")
    public ResponseEntity<List<ContactForm>> getAllFormSubmissions() {
        List<ContactForm> subscriptions = emailService.getAll();
        return ResponseEntity.ok(subscriptions);
    }
}
