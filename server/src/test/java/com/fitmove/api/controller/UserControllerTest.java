package com.fitmove.api.controller;

import com.fitmove.api.model.Address;
import com.fitmove.api.model.User;
import com.fitmove.api.repository.AddressRepository;
import com.fitmove.api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

     @Mock
     private UserRepository userRepository;

     @Mock
     private AddressRepository addressRepository;

     @InjectMocks
     private UserController userController;

     private User user;
     private Address address;

     @BeforeEach
     void setUp() {
          user = new User();
          user.setId(1L);
          user.setNome("João");
          user.setSobrenome("Silva");
          user.setEmail("joao@email.com");
          user.setPassword("senha123");

          address = new Address();
          address.setId(1L);
          address.setUser(user);
          address.setPrincipal(true);
     }

     @Test
     void testGetUserById_UserExists() {
          when(userRepository.findById(1L)).thenReturn(Optional.of(user));

          ResponseEntity<User> response = userController.getUserById(1L);

          assertEquals(200, response.getStatusCodeValue());
          assertNotNull(response.getBody());
          assertNull(response.getBody().getPassword()); // Senha não deve ser retornada
     }

     @Test
     void testGetUserById_UserNotFound() {
          when(userRepository.findById(1L)).thenReturn(Optional.empty());

          ResponseEntity<User> response = userController.getUserById(1L);

          assertEquals(404, response.getStatusCodeValue());
     }

     @Test
     void testUpdateUser_Success() {
          User updatedUser = new User();
          updatedUser.setNome("Carlos");
          updatedUser.setSobrenome("Pereira");
          updatedUser.setEmail("carlos@email.com");
          updatedUser.setPassword("novaSenha");

          when(userRepository.findById(1L)).thenReturn(Optional.of(user));
          when(userRepository.existsByEmail("carlos@email.com")).thenReturn(false);
          when(userRepository.save(any(User.class))).thenReturn(user);

          ResponseEntity<User> response = userController.updateUser(1L, updatedUser);

          assertEquals(200, response.getStatusCodeValue());
          assertEquals("Carlos", response.getBody().getNome());
          assertNull(response.getBody().getPassword());
     }

     @Test
     void testUpdateUser_EmailExists() {
          User updatedUser = new User();
          updatedUser.setEmail("novo@email.com");

          when(userRepository.findById(1L)).thenReturn(Optional.of(user));
          when(userRepository.existsByEmail("novo@email.com")).thenReturn(true);

          ResponseEntity<User> response = userController.updateUser(1L, updatedUser);

          assertEquals(400, response.getStatusCodeValue());
     }

     @Test
     void testGetUserAddresses_Success() {
          when(userRepository.existsById(1L)).thenReturn(true);
          when(addressRepository.findByUserId(1L)).thenReturn(Arrays.asList(address));

          ResponseEntity<List<Address>> response = userController.getUserAddresses(1L);

          assertEquals(200, response.getStatusCodeValue());
          assertEquals(1, response.getBody().size());
     }

     @Test
     void testGetUserAddresses_UserNotFound() {
          when(userRepository.existsById(1L)).thenReturn(false);

          ResponseEntity<List<Address>> response = userController.getUserAddresses(1L);

          assertEquals(404, response.getStatusCodeValue());
     }

     @Test
     void testAddUserAddress_Success() {
          when(userRepository.findById(1L)).thenReturn(Optional.of(user));
          when(addressRepository.findByUserId(1L)).thenReturn(Arrays.asList(address));
          when(addressRepository.save(any(Address.class))).thenReturn(address);

          ResponseEntity<Address> response = userController.addUserAddress(1L, address);

          assertEquals(200, response.getStatusCodeValue());
          assertNotNull(response.getBody());
     }

     @Test
     void testAddUserAddress_UserNotFound() {
          when(userRepository.findById(1L)).thenReturn(Optional.empty());

          ResponseEntity<Address> response = userController.addUserAddress(1L, address);

          assertEquals(404, response.getStatusCodeValue());
     }
}