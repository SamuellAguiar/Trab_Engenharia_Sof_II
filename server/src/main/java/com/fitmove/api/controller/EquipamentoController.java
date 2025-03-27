package com.fitmove.api.controller;

import com.fitmove.api.model.Equipamento;
import com.fitmove.api.service.EquipamentoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/equipamentos")
@RequiredArgsConstructor

public class EquipamentoController {
    
    private final EquipamentoService equipamentoService;
    
    @GetMapping("/buscarTodos")
    public ResponseEntity<List<Equipamento>> getAllEquipamentos(
            @RequestParam(required = false) List<String> categorias,
            @RequestParam(required = false) List<String> marcas,
            @RequestParam(required = false) BigDecimal precoMin,
            @RequestParam(required = false) BigDecimal precoMax) {
        return ResponseEntity.ok(equipamentoService.findEquipamentos(categorias, marcas, precoMin, precoMax));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Equipamento> getEquipamentoById(@PathVariable Long id) {
        return ResponseEntity.ok(equipamentoService.findById(id));
    }
    
    @GetMapping("/categoria/{categoria}")
    public List<Equipamento> getEquipamentosByCategoria(@PathVariable String categoria) {
        return equipamentoService.findByCategoria(categoria);
    }
    
    @PostMapping
    public ResponseEntity<Equipamento> createEquipamento(@RequestBody Equipamento equipamento) {
        return ResponseEntity.ok(equipamentoService.save(equipamento));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Equipamento> updateEquipamento(@PathVariable Long id, @RequestBody Equipamento equipamento) {
        equipamento.setId(id);
        return ResponseEntity.ok(equipamentoService.save(equipamento));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipamento(@PathVariable Long id) {
        equipamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

