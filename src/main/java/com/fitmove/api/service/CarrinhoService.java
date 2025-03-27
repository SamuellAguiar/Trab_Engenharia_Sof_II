package com.fitmove.api.service;

import com.fitmove.api.model.ItemCarrinho;
import com.fitmove.api.repository.ItemCarrinhoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    public List<ItemCarrinho> listarItensCarrinho() {
        return itemCarrinhoRepository.findAll();
    }

    @Transactional
    public ItemCarrinho adicionarItemCarrinho(ItemCarrinho item) {
        // Verificar se o item já existe no carrinho
        Optional<ItemCarrinho> itemExistente = itemCarrinhoRepository.findByItemIdAndTipo(
                item.getItemId(), item.getTipo());
        
        if (itemExistente.isPresent()) {
            // Se o item já existe, incrementar a quantidade
            ItemCarrinho itemAtual = itemExistente.get();
            itemAtual.setQuantidade(itemAtual.getQuantidade() + item.getQuantidade());
            return itemCarrinhoRepository.save(itemAtual);
        } else {
            // Se o item não existe, adicionar ao carrinho
            return itemCarrinhoRepository.save(item);
        }
    }

    @Transactional
    public void removerItemCarrinho(Long id) {
        itemCarrinhoRepository.deleteById(id);
    }

    @Transactional
    public ItemCarrinho atualizarQuantidadeItem(Long id, Integer quantidade) {
        ItemCarrinho item = itemCarrinhoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
        
        item.setQuantidade(quantidade);
        return itemCarrinhoRepository.save(item);
    }

    @Transactional
    public void limparCarrinho() {
        itemCarrinhoRepository.deleteAll();
    }
}

