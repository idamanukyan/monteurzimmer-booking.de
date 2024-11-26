package de.monteurzimmer.monteurzimmer_booking.frontend_config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //registry.addMapping("/api/**")
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                        "behavioural-journey-ezkggsrfj4miasdnnfqnxc1x.herokudns.com",
                        "https://check-monteurzimmer-frontend-6f3b50cb8e29.herokuapp.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}