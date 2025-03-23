package com.example.Academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Academy.services.CarrinhoService;
import com.example.Academy.entities.PagamentoRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

     @Autowired
     private CarrinhoService carrinhoService;

     @PostMapping("/finalizar-compra/{usuarioId}")
     public PagamentoRequest finalizarCompra(@PathVariable Long usuarioId) {
          return carrinhoService.prepararPagamento(usuarioId);
     }
}
