package com.example.Academy.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aluguel")
public class Aluguel {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String preco;
     private String duracao;
     
     @ManyToOne
     @JoinColumn(name = "usuario_id", nullable = false)
     private Usuario usuario;

     @ManyToOne
     @JoinColumn(name = "equipamento_id", nullable = false)
     private Equipamentos equipamento;

}
