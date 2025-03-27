package com.fitmove.api.service;

import com.fitmove.api.model.User;
import com.fitmove.api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

     @Mock
     private UserRepository userRepository;

     @InjectMocks
     private UserService userService;

     private User user;

     @BeforeEach
     void setUp() {
          user = new User();
          user.setId(1L);
          user.setNome("John");
          user.setSobrenome("Doe");
          user.setEmail("john.doe@example.com");
          user.setPassword("password123");
     }

     @Test
     void register_ShouldSaveUser_WhenEmailIsNotTaken() {
          when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
          when(userRepository.save(user)).thenReturn(user);

          User savedUser = userService.register(user);

          assertNotNull(savedUser);
          assertEquals(user.getEmail(), savedUser.getEmail());
          verify(userRepository, times(1)).save(user);
     }

     @Test
     void register_ShouldThrowException_WhenEmailIsAlreadyTaken() {
          when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

          Exception exception = assertThrows(RuntimeException.class, () -> userService.register(user));
          assertEquals("Email já cadastrado", exception.getMessage());

          verify(userRepository, never()).save(any(User.class));
     }

     @Test
     void findByEmail_ShouldReturnUser_WhenEmailExists() {
          when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

          Optional<User> foundUser = userService.findByEmail(user.getEmail());

          assertTrue(foundUser.isPresent());
          assertEquals(user.getEmail(), foundUser.get().getEmail());
     }

     @Test
     void findByEmail_ShouldReturnEmpty_WhenEmailDoesNotExist() {
          when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

          Optional<User> foundUser = userService.findByEmail(user.getEmail());

          assertFalse(foundUser.isPresent());
     }

     @Test
     void validateCredentials_ShouldReturnTrue_WhenCredentialsAreValid() {
          when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

          boolean isValid = userService.validateCredentials(user.getEmail(), "password123");

          assertTrue(isValid);
     }

     @Test
     void validateCredentials_ShouldReturnFalse_WhenPasswordIsIncorrect() {
          when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

          boolean isValid = userService.validateCredentials(user.getEmail(), "wrongpassword");

          assertFalse(isValid);
     }

     @Test
     void validateCredentials_ShouldReturnFalse_WhenEmailDoesNotExist() {
          when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

          boolean isValid = userService.validateCredentials(user.getEmail(), "password123");

          assertFalse(isValid);
     }
}
