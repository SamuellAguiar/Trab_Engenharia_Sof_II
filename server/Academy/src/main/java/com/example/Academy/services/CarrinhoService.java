package com.example.Academy.services;

import org.springframework.stereotype.Service;
import java.util.*;
import com.example.Academy.entities.ItemCarrinho;
import com.example.Academy.entities.PagamentoRequest;

@Service
public class CarrinhoService {
     private final Map<Long, List<ItemCarrinho>> carrinhos = new HashMap<>();

     public List<ItemCarrinho> visualizarCarrinho(Long usuarioId) {
          return carrinhos.getOrDefault(usuarioId, new ArrayList<>());
     }

     public void adicionarItem(Long usuarioId, Long equipamentoId, String nomeEquipamento, double preco,
               int quantidade) {
          List<ItemCarrinho> carrinho = carrinhos.computeIfAbsent(usuarioId, k -> new ArrayList<>());

          Optional<ItemCarrinho> itemExistente = carrinho.stream()
                    .filter(item -> item.getEquipamentoId().equals(equipamentoId))
                    .findFirst();

          if (itemExistente.isPresent()) {
               itemExistente.get().setQuantidade(itemExistente.get().getQuantidade() + quantidade);
          } else {
               carrinho.add(new ItemCarrinho(equipamentoId, nomeEquipamento, preco, quantidade));
          }
     }

     public void removerItem(Long usuarioId, Long equipamentoId) {
          List<ItemCarrinho> carrinho = carrinhos.get(usuarioId);
          if (carrinho != null) {
               carrinho.removeIf(item -> item.getEquipamentoId().equals(equipamentoId));
          }
     }

     public void limparCarrinho(Long usuarioId) {
          carrinhos.remove(usuarioId);
     }

     public double calcularTotal(Long usuarioId) {
          return carrinhos.getOrDefault(usuarioId, new ArrayList<>())
                    .stream()
                    .mapToDouble(item -> item.getPreco() * item.getQuantidade())
                    .sum();
     }

     public PagamentoRequest prepararPagamento(Long usuarioId) {
          List<ItemCarrinho> carrinho = visualizarCarrinho(usuarioId);
          double total = calcularTotal(usuarioId);

          return new PagamentoRequest(usuarioId, carrinho, total);
     }
}
