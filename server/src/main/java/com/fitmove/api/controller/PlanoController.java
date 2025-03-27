package com.fitmove.api.controller;

import com.fitmove.api.model.Plano;
import com.fitmove.api.service.PlanoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planos")
public class PlanoController {
    
    @Autowired
    private PlanoService planoService;
    
    @GetMapping
    public List<Plano> getAllPlanos(
            @RequestParam(required = false) List<String> categorias,
            @RequestParam(required = false) String nivel,
            @RequestParam(required = false) String duracaoTipo) {
        return planoService.findPlanos(categorias, nivel, duracaoTipo);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Plano> getPlanoById(@PathVariable Long id) {
        return ResponseEntity.ok(planoService.findById(id));
    }
    
    @GetMapping("/destaque")
    public List<Plano> getPlanosDestaque() {
        return planoService.findByDestaque(true);
    }
    
    @PostMapping
    public ResponseEntity<Plano> createPlano(@RequestBody Plano plano) {
        return ResponseEntity.ok(planoService.save(plano));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Plano> updatePlano(@PathVariable Long id, @RequestBody Plano plano) {
        plano.setId(id);
        return ResponseEntity.ok(planoService.save(plano));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlano(@PathVariable Long id) {
        planoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

