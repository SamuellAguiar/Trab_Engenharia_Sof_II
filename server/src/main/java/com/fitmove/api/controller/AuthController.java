package com.fitmove.api.controller;

import com.fitmove.api.model.User;
import com.fitmove.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            
            // Não retornar a senha na resposta
            registeredUser.setPassword(null);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        if (email == null || password == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Email e senha são obrigatórios");
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean isValid = userService.validateCredentials(email, password);
        
        if (isValid) {
            Optional<User> userOpt = userService.findByEmail(email);
            User user = userOpt.get();
            
            // Não retornar a senha na resposta
            user.setPassword(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            
            // Em um sistema real, geraríamos um token JWT aqui
            response.put("token", "dummy-token-" + System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Credenciais inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

