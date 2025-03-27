package com.fitmove.api.service;

import com.fitmove.api.model.Equipamento;
import com.fitmove.api.repository.EquipamentoRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EquipamentoService {
    
    @Autowired
    private EquipamentoRepository equipamentoRepository;
    
    public List<Equipamento> findAll() {
        return equipamentoRepository.findAll();
    }
    
    public Equipamento findById(Long id) {
        return equipamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Equipamento não encontrado com ID: " + id));
    }
    
    public List<Equipamento> findByCategoria(String categoriaSlug) {
        return equipamentoRepository.findByCategoria(categoriaSlug);
    }
    
    public List<Equipamento> findEquipamentos(List<String> categorias, List<String> marcas, 
                                             BigDecimal precoMin, BigDecimal precoMax) {
        List<Equipamento> result = new ArrayList<>();
        
        // Se não houver filtros, retorna todos
        if ((categorias == null || categorias.isEmpty()) && 
            (marcas == null || marcas.isEmpty()) && 
            precoMin == null && precoMax == null) {
            return findAll();
        }
        
        // Filtra por categorias
        if (categorias != null && !categorias.isEmpty()) {
            result = equipamentoRepository.findByCategorias(categorias);
        } else {
            result = findAll();
        }
        
        // Filtra por marcas
        if (marcas != null && !marcas.isEmpty()) {
            if (result.isEmpty()) {
                result = equipamentoRepository.findByMarcaIn(marcas);
            } else {
                result = result.stream()
                        .filter(e -> marcas.contains(e.getMarca()))
                        .collect(Collectors.toList());
            }
        }
        
        // Filtra por preço
        if (precoMin != null && precoMax != null) {
            if (result.isEmpty()) {
                result = equipamentoRepository.findByPrecoMensalBetween(precoMin, precoMax);
            } else {
                result = result.stream()
                        .filter(e -> e.getPrecoMensal().compareTo(precoMin) >= 0 && 
                                    e.getPrecoMensal().compareTo(precoMax) <= 0)
                        .collect(Collectors.toList());
            }
        }
        
        return result;
    }
    
    public Equipamento save(Equipamento equipamento) {
        return equipamentoRepository.save(equipamento);
    }
    
    public void delete(Long id) {
        equipamentoRepository.deleteById(id);
    }
}

