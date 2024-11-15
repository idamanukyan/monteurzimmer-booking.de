package de.monteurzimmer.monteurzimmer_booking.contact_us;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ContactFormRepository contactFormRepository;

    public void sendContactEmail(ContactFormDTO contactFormDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(contactFormDTO.getUserEmail());
        message.setTo("idamyan01@gmail.com"); // Your email address
        message.setSubject("New message from " + contactFormDTO.getUserName());
        message.setText(
                "Name: " + contactFormDTO.getUserName() + "\n" +
                        "Telefon: " + contactFormDTO.getUserPhone() + "\n" +
                        "Email: " + contactFormDTO.getUserEmail() + "\n" +
                        "Datum: " + contactFormDTO.getUserDate() + "\n" +
                        "Nachricht: " + contactFormDTO.getUserMessage()
        );

        ContactForm contactForm = modelMapper.map(contactFormDTO, ContactForm.class);
        contactFormRepository.save(contactForm);

        mailSender.send(message);
    }

    public List<ContactForm> getAll() {
        return contactFormRepository.findAll();
    }
}
