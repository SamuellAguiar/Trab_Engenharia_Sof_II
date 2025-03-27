package com.fitmove.api.service;

import com.fitmove.api.model.User;
import com.fitmove.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User register(User user) {
        // Verificar se o email já existe
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Em um sistema real, faríamos hash da senha aqui
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean validateCredentials(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Em um sistema real, verificaríamos o hash da senha
            // return passwordEncoder.matches(password, user.getPassword());
            return password.equals(user.getPassword());
        }
        
        return false;
    }
}

