package com.example.Academy.services;

import com.example.Academy.entities.Equipamentos;
import com.example.Academy.repositories.EquipamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipamentosService {

     @Autowired
     private EquipamentosRepository equipamentosRepository;

     public List<Equipamentos> listarTodos() {
          return equipamentosRepository.findAll();
     }

     public Optional<Equipamentos> buscarPorId(Long id) {
          return equipamentosRepository.findById(id);
     }

     public Equipamentos salvar(Equipamentos equipamento) {
          return equipamentosRepository.save(equipamento);
     }

     public Equipamentos atualizar(Long id, Equipamentos equipamentoAtualizado) {
          if (equipamentosRepository.existsById(id)) {
               equipamentoAtualizado.setId(id);
               return equipamentosRepository.save(equipamentoAtualizado);
          }
          throw new RuntimeException("Equipamento não encontrado");
     }

     public void deletar(Long id) {
          equipamentosRepository.deleteById(id);
     }
}
