package com.example.Academy.services;

import com.example.Academy.entities.Aluguel;
import com.example.Academy.repositories.AluguelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AluguelService {

     @Autowired
     private AluguelRepository aluguelRepository;

     public List<Aluguel> listarTodos() {
          return aluguelRepository.findAll();
     }

     public Optional<Aluguel> buscarPorId(Long id) {
          return aluguelRepository.findById(id);
     }

     public Aluguel salvar(Aluguel aluguel) {
          return aluguelRepository.save(aluguel);
     }

     public Aluguel atualizar(Long id, Aluguel aluguelAtualizado) {
          if (aluguelRepository.existsById(id)) {
               aluguelAtualizado.setId(id);
               return aluguelRepository.save(aluguelAtualizado);
          }
          throw new RuntimeException("Aluguel não encontrado");
     }

     public void deletar(Long id) {
          aluguelRepository.deleteById(id);
     }
}
