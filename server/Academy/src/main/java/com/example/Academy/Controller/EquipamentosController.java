package com.example.Academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Academy.entities.Equipamentos;
import com.example.Academy.services.EquipamentosService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipamentos")
public class EquipamentosController {

    @Autowired
    private EquipamentosService equipamentosService;

    @PostMapping
    public ResponseEntity<Equipamentos> criarEquipamento(@Valid @RequestBody Equipamentos equipamento) {
        Equipamentos novoEquipamento = equipamentosService.salvar(equipamento);
        return ResponseEntity.ok(novoEquipamento);
    }

    @GetMapping
    public ResponseEntity<List<Equipamentos>> listarEquipamentos() {
        return ResponseEntity.ok(equipamentosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipamentos> buscarEquipamento(@PathVariable Long id) {
        Optional<Equipamentos> equipamento = equipamentosService.buscarPorId(id);
        return equipamento.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipamentos> atualizarEquipamento(@PathVariable Long id,
            @Valid @RequestBody Equipamentos equipamento) {
        Equipamentos atualizado = equipamentosService.atualizar(id, equipamento);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEquipamento(@PathVariable Long id) {
        equipamentosService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}