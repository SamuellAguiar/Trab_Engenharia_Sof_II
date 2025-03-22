package com.example.Academy.entities;

import java.util.List;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PagamentoRequest {
     private Long usuarioId;
     private List<ItemCarrinho> itens;
     private double total;

     public PagamentoRequest(Long usuarioId, List<ItemCarrinho> itens, double total) {
          this.usuarioId = usuarioId;
          this.itens = itens;
          this.total = total;
     }

     public Long getUsuarioId() {
          return usuarioId;
     }

     public List<ItemCarrinho> getItens() {
          return itens;
     }

     public double getTotal() {
          return total;
     }
}
