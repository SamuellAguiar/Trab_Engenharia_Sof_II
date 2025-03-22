package com.example.Academy.services;

import com.example.Academy.dto.PlanoDTO;
import com.example.Academy.entities.Plano;
import com.example.Academy.repositories.PlanoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanoService {

     @Autowired
     private PlanoRepository planoRepository;

     @Autowired
     private ModelMapper modelMapper;

     public List<PlanoDTO> listarTodos() {
          List<Plano> planos = planoRepository.findAll();
          return planos.stream()
                    .map(plano -> modelMapper.map(plano, PlanoDTO.class))
                    .collect(Collectors.toList());
     }

     public Optional<PlanoDTO> buscarPorId(Long id) {
          return planoRepository.findById(id)
                    .map(plano -> modelMapper.map(plano, PlanoDTO.class));
     }

     public PlanoDTO salvar(Plano plano) {
          Plano novoPlano = planoRepository.save(plano);
          return modelMapper.map(novoPlano, PlanoDTO.class);
     }

     public PlanoDTO atualizar(Long id, Plano planoAtualizado) {
          if (planoRepository.existsById(id)) {
               planoAtualizado.setId(id);
               Plano atualizado = planoRepository.save(planoAtualizado);
               return modelMapper.map(atualizado, PlanoDTO.class);
          }
          throw new RuntimeException("Plano não encontrado");
     }

     public void deletar(Long id) {
          planoRepository.deleteById(id);
     }
}
