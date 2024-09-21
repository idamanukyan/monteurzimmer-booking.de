package de.monteurzimmer.monteurzimmer_booking.user_management.service;

import de.monteurzimmer.monteurzimmer_booking.user_management.entity.Role;
import de.monteurzimmer.monteurzimmer_booking.user_management.entity.User;
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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
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
        log.info("User has tried to get all information about customers");
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        log.info("User has tried to get information about a user");
        return modelMapper
                .map((userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(String.valueOf(id)))), UserDTO.class);
    }

    public UserDTO createUser(UserDTO userDto) {
        log.info("User creation started.");
        if (userRepository.existsByEmail(userDto.getEmail())) {
            log.error("User has tried to add a user with already registered email.");
            throw new ApplicationException(HttpStatus.BAD_REQUEST, "User already exists.");
        }
        User user = modelMapper.map(userDto, User.class);
        final Role role = this.roleRepository.findUserRole()
                .orElseThrow(() -> new RuntimeException("Something wrong please contact support"));

        user.setDeleted(false);

        user.setRoles(Set.of(role));
        userRepository.save(user);
        return userDto;
    }

    public UserDTO updateUser(Long id, UpdateUserDTO userDetails) {
        log.info("User has tried to update information about a user");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User with id : {%s} not found", id.toString())));
        Optional.ofNullable(userDetails.getName()).ifPresent(user::setName);
        Optional.ofNullable(userDetails.getSurname()).ifPresent(user::setSurname);
        Optional.ofNullable(userDetails.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(userDetails.getAddress()).ifPresent(user::setAddress);
        Optional.ofNullable(userDetails.getProfilePicture()).ifPresent(user::setProfilePicture);

        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    public void deleteUser(Long id) {
        log.info("User has tried to delete information about a user");
        User user = userRepository.findById(id).get();
        if (user.getDeleted()) {
            log.error("User has tried to delete already deleted customer");
            throw new ApplicationException(HttpStatus.BAD_REQUEST, "User is deleted.");
        }
        user.setDeleted(true);
        userRepository.save(user);
    }

}

