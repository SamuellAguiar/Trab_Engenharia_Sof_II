package com.fitmove.api.controller;

import com.fitmove.api.model.ItemCarrinho;
import com.fitmove.api.service.CarrinhoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carrinho")  
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    // Endpoint para listar os itens do carrinho
    @GetMapping
    public ResponseEntity<List<ItemCarrinho>> listarItensCarrinho() {
        return ResponseEntity.ok(carrinhoService.listarItensCarrinho());
    }

    // Endpoint para adicionar um item ao carrinho
    @PostMapping("/adicionar")
    public ResponseEntity<ItemCarrinho> adicionarItemCarrinho(@RequestBody ItemCarrinho item) {
        return ResponseEntity.ok(carrinhoService.adicionarItemCarrinho(item));
    }

    // Endpoint para remover um item do carrinho pelo ID
    @DeleteMapping("/remover/{id}")
    public ResponseEntity<Void> removerItemCarrinho(@PathVariable Long id) {
        carrinhoService.removerItemCarrinho(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para atualizar a quantidade de um item no carrinho
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<ItemCarrinho> atualizarQuantidadeItem(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> payload) {
        
        Integer quantidade = payload.get("quantidade");
        if (quantidade == null || quantidade < 1) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(carrinhoService.atualizarQuantidadeItem(id, quantidade));
    }

    // Endpoint para limpar o carrinho
    @DeleteMapping("/limpar")
    public ResponseEntity<Void> limparCarrinho() {
        carrinhoService.limparCarrinho();
        return ResponseEntity.noContent().build();
    }
}
