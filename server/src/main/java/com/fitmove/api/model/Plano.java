package com.fitmove.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plano {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    private String subtitulo;
    
    private String descricao;
    
    private String imagem;
    
    private BigDecimal preco;
    
    private String duracao;
    
    private String duracaoTipo; // mensal, trimestral, etc.
    
    private String nivel; // iniciante, intermediario, avancado
    
    private Boolean destaque = false;
    
    @ElementCollection
    @CollectionTable(name = "plano_equipamentos", joinColumns = @JoinColumn(name = "plano_id"))
    @Column(name = "equipamento")
    private List<String> equipamentos = new ArrayList<>();
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "plano_categoria",
        joinColumns = @JoinColumn(name = "plano_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();
}

