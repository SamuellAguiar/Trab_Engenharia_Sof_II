package com.fitmove.api.controller;

import com.fitmove.api.model.User;
import com.fitmove.api.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

class AuthControllerTest {

     @Mock
     private UserService userService;

     @InjectMocks
     private AuthController authController;

     @BeforeEach
     void setUp() {
          MockitoAnnotations.openMocks(this);
     }

     @Test
     void testRegister_Success() {
          User user = new User();
          user.setEmail("test@example.com");
          user.setPassword("password123");

          when(userService.register(any(User.class))).thenReturn(user);

          ResponseEntity<?> response = authController.register(user);

          assertEquals(CREATED, response.getStatusCode());
          User responseBody = (User) response.getBody();
          assertNotNull(responseBody);
          assertNull(responseBody.getPassword()); // A senha não deve ser retornada
     }

     @Test
     void testRegister_Failure() {
          User user = new User();
          user.setEmail("test@example.com");
          user.setPassword("password123");

          when(userService.register(any(User.class))).thenThrow(new RuntimeException("Erro ao registrar"));

          ResponseEntity<?> response = authController.register(user);

          assertEquals(BAD_REQUEST, response.getStatusCode());
          Map<String, String> responseBody = (Map<String, String>) response.getBody();
          assertEquals("Erro ao registrar", responseBody.get("error"));
     }

     @Test
     void testLogin_Success() {
          String email = "test@example.com";
          String password = "password123";
          User user = new User();
          user.setEmail(email);
          user.setPassword(password);

          when(userService.validateCredentials(email, password)).thenReturn(true);
          when(userService.findByEmail(email)).thenReturn(Optional.of(user));

          Map<String, String> credentials = new HashMap<>();
          credentials.put("email", email);
          credentials.put("password", password);

          ResponseEntity<?> response = authController.login(credentials);

          assertEquals(OK, response.getStatusCode());
          Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
          assertNotNull(responseBody.get("user"));
          assertNotNull(responseBody.get("token"));
     }

     @Test
     void testLogin_Failure_InvalidCredentials() {
          String email = "test@example.com";
          String password = "wrongpassword";

          when(userService.validateCredentials(email, password)).thenReturn(false);

          Map<String, String> credentials = new HashMap<>();
          credentials.put("email", email);
          credentials.put("password", password);

          ResponseEntity<?> response = authController.login(credentials);

          assertEquals(UNAUTHORIZED, response.getStatusCode());
          Map<String, String> responseBody = (Map<String, String>) response.getBody();
          assertEquals("Credenciais inválidas", responseBody.get("error"));
     }

     @Test
     void testLogin_Failure_MissingCredentials() {
          Map<String, String> credentials = new HashMap<>();
          credentials.put("email", "test@example.com");
          // Senha ausente

          ResponseEntity<?> response = authController.login(credentials);

          assertEquals(BAD_REQUEST, response.getStatusCode());
          Map<String, String> responseBody = (Map<String, String>) response.getBody();
          assertEquals("Email e senha são obrigatórios", responseBody.get("error"));
     }
}
