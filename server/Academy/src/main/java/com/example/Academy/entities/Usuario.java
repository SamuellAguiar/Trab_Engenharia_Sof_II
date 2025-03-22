package com.example.Academy.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome;
     @Column(unique = true, nullable = false)
     private String email;
     private String senha;
     @Column(unique = true, nullable = false)
     private String cpf;
     private String telefone;
     private String endereco;

     @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
     private List<Aluguel> alugueis;

     @ManyToOne
     @JoinColumn(name = "plano_id", nullable = false)
     private Plano plano;
}
