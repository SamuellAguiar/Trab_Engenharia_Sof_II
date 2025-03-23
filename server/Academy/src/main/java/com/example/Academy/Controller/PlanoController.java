package com.example.Academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Academy.dto.PlanoDTO;
import com.example.Academy.entities.Plano;
import com.example.Academy.services.PlanoService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/planos")
public class PlanoController {

    @Autowired
    private PlanoService planoService;

    @PostMapping("/CriarPlano")
    public ResponseEntity<PlanoDTO> criarPlano(@Valid @RequestBody Plano plano) {
        PlanoDTO novoPlano = planoService.salvar(plano);
        return ResponseEntity.ok(novoPlano);
    }

    @GetMapping
    public ResponseEntity<List<PlanoDTO>> listarPlanos() {
        return ResponseEntity.ok(planoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoDTO> buscarPlano(@PathVariable Long id) {
        Optional<PlanoDTO> plano = planoService.buscarPorId(id);
        return plano.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoDTO> atualizarPlano(@PathVariable Long id, @Valid @RequestBody Plano plano) {
        PlanoDTO atualizado = planoService.atualizar(id, plano);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPlano(@PathVariable Long id) {
        planoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
