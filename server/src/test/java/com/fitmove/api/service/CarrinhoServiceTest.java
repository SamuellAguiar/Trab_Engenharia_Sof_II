package com.fitmove.api.service;

import com.fitmove.api.model.ItemCarrinho;
import com.fitmove.api.repository.ItemCarrinhoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarrinhoServiceTest {

     @Mock
     private ItemCarrinhoRepository itemCarrinhoRepository;

     @InjectMocks
     private CarrinhoService carrinhoService;

     private ItemCarrinho item;

     @BeforeEach
     void setUp() {
          item = new ItemCarrinho();
          item.setId(1L);
          item.setItemId(100L);
          item.setTipo("equipamento");
          item.setQuantidade(1);
     }

     @Test
     void testListarItensCarrinho() {
          when(itemCarrinhoRepository.findAll()).thenReturn(Arrays.asList(item));

          List<ItemCarrinho> itens = carrinhoService.listarItensCarrinho();
          assertFalse(itens.isEmpty());
          assertEquals(1, itens.size());
     }

     @Test
     void testAdicionarItemCarrinho_NovoItem() {
          when(itemCarrinhoRepository.findByItemIdAndTipo(item.getItemId(), item.getTipo()))
                    .thenReturn(Optional.empty());
          when(itemCarrinhoRepository.save(any(ItemCarrinho.class))).thenReturn(item);

          ItemCarrinho novoItem = carrinhoService.adicionarItemCarrinho(item);
          assertNotNull(novoItem);
          assertEquals(1L, novoItem.getId());
     }

     @Test
     void testAdicionarItemCarrinho_ItemExistente() {
          ItemCarrinho existente = new ItemCarrinho();
          existente.setId(1L);
          existente.setItemId(100L);
          existente.setTipo("equipamento");
          existente.setQuantidade(2);

          when(itemCarrinhoRepository.findByItemIdAndTipo(item.getItemId(), item.getTipo()))
                    .thenReturn(Optional.of(existente));
          when(itemCarrinhoRepository.save(any(ItemCarrinho.class))).thenReturn(existente);

          ItemCarrinho atualizado = carrinhoService.adicionarItemCarrinho(item);
          assertEquals(3, atualizado.getQuantidade());
     }

     @Test
     void testRemoverItemCarrinho() {
          doNothing().when(itemCarrinhoRepository).deleteById(1L);

          assertDoesNotThrow(() -> carrinhoService.removerItemCarrinho(1L));
          verify(itemCarrinhoRepository, times(1)).deleteById(1L);
     }

     @Test
     void testAtualizarQuantidadeItem() {
          when(itemCarrinhoRepository.findById(1L)).thenReturn(Optional.of(item));
          when(itemCarrinhoRepository.save(any(ItemCarrinho.class))).thenReturn(item);

          ItemCarrinho atualizado = carrinhoService.atualizarQuantidadeItem(1L, 5);
          assertEquals(5, atualizado.getQuantidade());
     }

     @Test
     void testLimparCarrinho() {
          doNothing().when(itemCarrinhoRepository).deleteAll();

          assertDoesNotThrow(() -> carrinhoService.limparCarrinho());
          verify(itemCarrinhoRepository, times(1)).deleteAll();
     }
}
