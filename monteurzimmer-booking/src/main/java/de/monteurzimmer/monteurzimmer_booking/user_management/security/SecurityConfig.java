package de.monteurzimmer.monteurzimmer_booking.user_management.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    private final MyUserDetailsService userDetailsService;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter, MyUserDetailsService userDetailsService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.userDetailsService = userDetailsService;
    }
/*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors()
                .and()
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API-based applications
              *//*  .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/sign-in").permitAll()
                        .requestMatchers("/api/properties/cheapest").permitAll()
                        .requestMatchers("/api/properties/favorites").permitAll()
                        .requestMatchers("/api/cities/favorites").permitAll()
                        .requestMatchers("/api/cities/all").permitAll()
                        .requestMatchers("api/properties/city/{city}").permitAll()
                        .anyRequest().permitAll()
                )*//*
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Set session policy to stateless (JWT)
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter before authentication
                .build();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors()
                .and()
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API-based applications
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Allow all requests (temporary for debugging)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless sessions
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class) // JWT filter
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

