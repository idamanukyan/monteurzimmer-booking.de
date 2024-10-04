package de.monteurzimmer.monteurzimmer_booking.user_management.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/client/storage/upload/icons/city/**").permitAll() // Allow access to your image directory
                        .anyRequest().permitAll() // Keep allowing all other requests
                );
        return http.build();
    }


/*    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder() // For simplicity, encode the password
                .username("frontend-user")
                .password("xx5xx5xx5")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }*/
}
