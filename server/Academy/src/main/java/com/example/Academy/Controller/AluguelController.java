package com.example.Academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Academy.entities.Aluguel;
import com.example.Academy.services.AluguelService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/alugueis")
public class AluguelController {

     @Autowired
     private AluguelService aluguelService;

     @PostMapping
     public ResponseEntity<Aluguel> criarAluguel(@RequestBody Aluguel aluguel) {
          Aluguel novoAluguel = aluguelService.salvar(aluguel);
          return ResponseEntity.ok(novoAluguel);
     }

     @GetMapping
     public ResponseEntity<List<Aluguel>> listarAlugueis() {
          return ResponseEntity.ok(aluguelService.listarTodos());
     }

     @GetMapping("/{id}")
     public ResponseEntity<Aluguel> buscarAluguel(@PathVariable Long id) {
          Optional<Aluguel> aluguel = aluguelService.buscarPorId(id);
          return aluguel.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deletarAluguel(@PathVariable Long id) {
          aluguelService.deletar(id);
          return ResponseEntity.noContent().build();
     }
}