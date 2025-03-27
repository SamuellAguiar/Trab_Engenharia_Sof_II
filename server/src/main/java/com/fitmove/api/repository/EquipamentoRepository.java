package com.fitmove.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitmove.api.model.Equipamento;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {
    
    @Query("SELECT e FROM Equipamento e JOIN e.categorias c WHERE c.slug = :categoriaSlug")
    List<Equipamento> findByCategoria(@Param("categoriaSlug") String categoriaSlug);
    
    @Query("SELECT e FROM Equipamento e JOIN e.categorias c WHERE c.slug IN :categorias")
    List<Equipamento> findByCategorias(@Param("categorias") List<String> categorias);
    
    List<Equipamento> findByMarcaIn(List<String> marcas);
    
    List<Equipamento> findByPrecoMensalBetween(BigDecimal min, BigDecimal max);
}

