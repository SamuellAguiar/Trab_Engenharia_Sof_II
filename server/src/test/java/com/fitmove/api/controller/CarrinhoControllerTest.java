package com.fitmove.api.controller;

import com.fitmove.api.model.ItemCarrinho;
import com.fitmove.api.service.CarrinhoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CarrinhoController.class)
class CarrinhoControllerTest {

     @Autowired
     private MockMvc mockMvc;

     @MockBean
     private CarrinhoService carrinhoService;

     @Test
     void testListarItensCarrinho() throws Exception {
          when(carrinhoService.listarItensCarrinho()).thenReturn(Collections.emptyList());

          mockMvc.perform(MockMvcRequestBuilders.get("/carrinho"))
                    .andExpect(status().isOk())
                    .andExpect(content().json("[]"));
     }

     @Test
     void testAdicionarItemCarrinho() throws Exception {
          ItemCarrinho item = new ItemCarrinho();
          item.setId(1L);
          when(carrinhoService.adicionarItemCarrinho(any(ItemCarrinho.class))).thenReturn(item);

          mockMvc.perform(MockMvcRequestBuilders.post("/carrinho/adicionar")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"itemId\": 100, \"tipo\": \"equipamento\", \"quantidade\": 1}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1));
     }

     @Test
     void testRemoverItemCarrinho() throws Exception {
          doNothing().when(carrinhoService).removerItemCarrinho(1L);

          mockMvc.perform(MockMvcRequestBuilders.delete("/carrinho/remover/1"))
                    .andExpect(status().isNoContent());
     }

     @Test
     void testAtualizarQuantidadeItem() throws Exception {
          ItemCarrinho item = new ItemCarrinho();
          item.setId(1L);
          item.setQuantidade(5);
          when(carrinhoService.atualizarQuantidadeItem(eq(1L), eq(5))).thenReturn(item);

          mockMvc.perform(MockMvcRequestBuilders.put("/carrinho/atualizar/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"quantidade\": 5}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.quantidade").value(5));
     }

     @Test
     void testAtualizarQuantidadeItem_ComQuantidadeInvalida() throws Exception {
          mockMvc.perform(MockMvcRequestBuilders.put("/carrinho/atualizar/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"quantidade\": 0}"))
                    .andExpect(status().isBadRequest());
     }

     @Test
     void testLimparCarrinho() throws Exception {
          doNothing().when(carrinhoService).limparCarrinho();

          mockMvc.perform(MockMvcRequestBuilders.delete("/carrinho/limpar"))
                    .andExpect(status().isNoContent());
     }
}
