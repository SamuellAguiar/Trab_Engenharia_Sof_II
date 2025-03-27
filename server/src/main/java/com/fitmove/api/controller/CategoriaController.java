package com.fitmove.api.controller;

import com.fitmove.api.model.Categoria;
import com.fitmove.api.service.CategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    @GetMapping
    public List<Categoria> getAllCategorias() {
        return categoriaService.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<Categoria> getCategoriaBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(categoriaService.findBySlug(slug));
    }
    
    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.save(categoria));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        categoria.setId(id);
        return ResponseEntity.ok(categoriaService.save(categoria));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

