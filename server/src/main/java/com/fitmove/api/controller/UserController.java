package com.fitmove.api.controller;

import com.fitmove.api.model.Address;
import com.fitmove.api.model.User;
import com.fitmove.api.repository.AddressRepository;
import com.fitmove.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AddressRepository addressRepository;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        
        if (user.isPresent()) {
            // Não retornar a senha
            user.get().setPassword(null);
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> userOpt = userRepository.findById(id);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Atualizar apenas os campos permitidos
            user.setNome(userDetails.getNome());
            user.setSobrenome(userDetails.getSobrenome());
            
            // Não permitir alteração de email para um que já existe
            if (!user.getEmail().equals(userDetails.getEmail())) {
                if (userRepository.existsByEmail(userDetails.getEmail())) {
                    return ResponseEntity.badRequest().build();
                }
                user.setEmail(userDetails.getEmail());
            }
            
            // Atualizar senha apenas se fornecida
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                // Em um sistema real, faríamos hash da senha aqui
                user.setPassword(userDetails.getPassword());
            }
            
            User updatedUser = userRepository.save(user);
            updatedUser.setPassword(null); // Não retornar a senha
            
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        if (!userRepository.existsById(userId)) {
            return ResponseEntity.notFound().build();
        }
        
        List<Address> addresses = addressRepository.findByUserId(userId);
        return ResponseEntity.ok(addresses);
    }
    
    @PostMapping("/{userId}/addresses")
    public ResponseEntity<Address> addUserAddress(@PathVariable Long userId, @RequestBody Address address) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Se este endereço for marcado como principal, desmarcar os outros
            if (Boolean.TRUE.equals(address.getPrincipal())) {
                List<Address> existingAddresses = addressRepository.findByUserId(userId);
                existingAddresses.forEach(addr -> {
                    addr.setPrincipal(false);
                    addressRepository.save(addr);
                });
            }
            
            address.setUser(user);
            Address savedAddress = addressRepository.save(address);
            
            return ResponseEntity.ok(savedAddress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

