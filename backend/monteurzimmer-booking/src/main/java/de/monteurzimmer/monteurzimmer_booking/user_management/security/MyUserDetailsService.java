package de.monteurzimmer.monteurzimmer_booking.user_management.security;

import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        de.monteurzimmer.monteurzimmer_booking.user_management.entity.User userEntity = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        Collection<? extends GrantedAuthority> authorities = userEntity.getRoles().stream()
                .map(role -> (GrantedAuthority) role)
                .collect(Collectors.toList());

        return new User(userEntity.getEmail(), userEntity.getPassword(), authorities);
    }
}