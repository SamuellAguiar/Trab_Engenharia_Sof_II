package com.fitmove.api.service;

import com.fitmove.api.model.Plano;
import com.fitmove.api.repository.PlanoRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanoService {
    
    @Autowired
    private PlanoRepository planoRepository;
    
    public List<Plano> findAll() {
        return planoRepository.findAll();
    }
    
    public Plano findById(Long id) {
        return planoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plano não encontrado com ID: " + id));
    }
    
    public List<Plano> findByDestaque(Boolean destaque) {
        return planoRepository.findByDestaque(destaque);
    }
    
    public List<Plano> findPlanos(List<String> categorias, String nivel, String duracaoTipo) {
        List<Plano> result = new ArrayList<>();
        
        // Se não houver filtros, retorna todos
        if ((categorias == null || categorias.isEmpty()) && 
            nivel == null && duracaoTipo == null) {
            return findAll();
        }
        
        // Filtra por categorias
        if (categorias != null && !categorias.isEmpty()) {
            result = planoRepository.findByCategorias(categorias);
        } else {
            result = findAll();
        }
        
        // Filtra por nível
        if (nivel != null) {
            if (result.isEmpty()) {
                result = planoRepository.findByNivel(nivel);
            } else {
                result = result.stream()
                        .filter(p -> p.getNivel().equals(nivel))
                        .collect(Collectors.toList());
            }
        }
        
        // Filtra por duração
        if (duracaoTipo != null) {
            if (result.isEmpty()) {
                result = planoRepository.findByDuracaoTipo(duracaoTipo);
            } else {
                result = result.stream()
                        .filter(p -> p.getDuracaoTipo().equals(duracaoTipo))
                        .collect(Collectors.toList());
            }
        }
        
        return result;
    }
    
    public Plano save(Plano plano) {
        return planoRepository.save(plano);
    }
    
    public void delete(Long id) {
        planoRepository.deleteById(id);
    }
}

