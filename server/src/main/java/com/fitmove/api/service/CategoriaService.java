package com.fitmove.api.service;

import com.fitmove.api.model.Categoria;
import com.fitmove.api.repository.CategoriaRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }
    
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com ID: " + id));
    }
    
    public Categoria findBySlug(String slug) {
        return categoriaRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com slug: " + slug));
    }
    
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    public void delete(Long id) {
        categoriaRepository.deleteById(id);
    }
}

