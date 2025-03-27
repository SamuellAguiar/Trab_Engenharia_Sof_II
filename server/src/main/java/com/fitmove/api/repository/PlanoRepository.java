package com.fitmove.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitmove.api.model.Plano;

import java.util.List;

@Repository
public interface PlanoRepository extends JpaRepository<Plano, Long> {
    
    List<Plano> findByDestaque(Boolean destaque);
    
    List<Plano> findByNivel(String nivel);
    
    List<Plano> findByDuracaoTipo(String duracaoTipo);
    
    @Query("SELECT p FROM Plano p JOIN p.categorias c WHERE c.slug IN :categorias")
    List<Plano> findByCategorias(@Param("categorias") List<String> categorias);
}

