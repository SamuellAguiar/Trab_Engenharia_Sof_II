package com.example.Academy.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
@Table(name = "equipamentos")
public class Equipamentos {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome;
     private Double preco; 
     private Double precoOferta; 
     private String categoria; 
     private String imagem; 

     @OneToMany(mappedBy = "equipamento", cascade = CascadeType.ALL, orphanRemoval = true)
     private List<Aluguel> alugueis;
}
