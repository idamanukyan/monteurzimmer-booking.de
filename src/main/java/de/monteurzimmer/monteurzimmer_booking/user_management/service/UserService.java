package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user.CreateUserDTO;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user.UpdateUserDTO;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.dto.user.UserDTO;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.RoleRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.repository.UserRepository;
import de.monteurzimmer.monteurzimmer_booking.user_management.util.exception.ApplicationException;
import de.monteurzimmer.monteurzimmer_booking.user_management.util.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    final Logger log = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;


    public UserService(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return modelMapper
                .map((userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(String.valueOf(id)))), UserDTO.class);
    }

    public CreateUserDTO createUser(CreateUserDTO userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            log.error("User has tried to add a user with already registered email.");
            throw new ApplicationException(HttpStatus.BAD_REQUEST, "User already exists.");
        }
        User user = modelMapper.map(userDto, User.class);
        final Role role = this.roleRepository.findUserRole()
                .orElseThrow(() -> new RuntimeException("Something wrong please contact support"));

        user.setDeleted(false);
        user.setVerified(false);
        user.setHasAdminApproved(false);
        user.setCreated(LocalDateTime.now());
        user.setRoles(Set.of(role));
        userRepository.save(user);
        return userDto;
    }

    public UserDTO updateUser(Long id, UpdateUserDTO userDetails) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with id : {%s} not found", id.toString())));
        Optional.ofNullable(userDetails.getName()).ifPresent(user::setName);
        Optional.ofNullable(userDetails.getSurname()).ifPresent(user::setSurname);
        Optional.ofNullable(userDetails.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(userDetails.getAddress()).ifPresent(user::setAddress);
        Optional.ofNullable(userDetails.getProfilePicture()).ifPresent(user::setProfilePicture);

        user.setUpdated(LocalDateTime.now());
        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).get();
        if (user.getDeleted()) {
            log.error("User has tried to delete already deleted customer");
            throw new ApplicationException(HttpStatus.BAD_REQUEST, "User is deleted.");
        }
        user.setDeleted(true);
        userRepository.save(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            System.out.println("No authenticated user found.");
            return null;  // Return null if no user is logged in
        }

        String email = authentication.getName();  // Assuming the user's email is used as the principal
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public ResponseEntity<?> signIn(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            // User not found
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        User user = userOptional.get();

        if (!Objects.equals(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Wrong password or email");
        }
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return new ResponseEntity<>(
                       userDTO, HttpStatus.OK);
    }
}

