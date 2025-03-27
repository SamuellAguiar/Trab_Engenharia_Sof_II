package com.fitmove.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    private String sobrenome;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    // Não armazenamos a senha em texto puro em produção,
    // mas para simplificar este exemplo, vamos deixar assim
}

