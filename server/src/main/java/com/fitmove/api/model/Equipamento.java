package com.fitmove.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    private String descricao;
    
    private String imagem;
    
    private BigDecimal precoDiario;
    
    private BigDecimal precoSemanal;
    
    private BigDecimal precoMensal;
    
    private String marca;
    
    private Integer avaliacao;
    
    private Boolean disponivel = true;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "equipamento_categoria",
        joinColumns = @JoinColumn(name = "equipamento_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();
}

