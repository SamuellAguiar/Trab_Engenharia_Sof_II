package com.example.Academy.entities;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ItemCarrinho {
     private Long equipamentoId;
     private String nomeEquipamento;
     private double preco;
     private int quantidade;

     public ItemCarrinho(Long equipamentoId, String nomeEquipamento, double preco, int quantidade) {
          this.equipamentoId = equipamentoId;
          this.nomeEquipamento = nomeEquipamento;
          this.preco = preco;
          this.quantidade = quantidade;
     }

     public Long getEquipamentoId() {
          return equipamentoId;
     }

     public String getNomeEquipamento() {
          return nomeEquipamento;
     }

     public double getPreco() {
          return preco;
     }

     public int getQuantidade() {
          return quantidade;
     }

     public void setQuantidade(int quantidade) {
          this.quantidade = quantidade;
     }
}
