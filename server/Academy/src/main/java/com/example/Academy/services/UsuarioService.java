package com.example.Academy.services;

import com.example.Academy.dto.UsuarioDTO;
import com.example.Academy.entities.Usuario;
import com.example.Academy.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
     private final UsuarioRepository usuarioRepository;
     private final BCryptPasswordEncoder passwordEncoder;
     private final ModelMapper modelMapper;

     public UsuarioService(UsuarioRepository usuarioRepository, ModelMapper modelMapper) {
          this.usuarioRepository = usuarioRepository;
          this.passwordEncoder = new BCryptPasswordEncoder();
          this.modelMapper = modelMapper;
     }

     public List<UsuarioDTO> listarTodos() {
          return usuarioRepository.findAll()
                    .stream()
                    .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                    .collect(Collectors.toList());
     }

     public Optional<UsuarioDTO> buscarPorId(Long id) {
          return usuarioRepository.findById(id)
                    .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class));
     }

     public UsuarioDTO cadastrarUsuarioSeguro(Usuario usuario) {
          usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
          Usuario novoUsuario = usuarioRepository.save(usuario);
          return modelMapper.map(novoUsuario, UsuarioDTO.class);
     }

     public boolean autenticarUsuario(String email, String senha) {
          Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
          return usuarioOpt.isPresent() && passwordEncoder.matches(senha, usuarioOpt.get().getSenha());
     }

     public UsuarioDTO atualizar(Long id, Usuario usuarioAtualizado) {
          if (usuarioRepository.existsById(id)) {
               usuarioAtualizado.setId(id);
               Usuario atualizado = usuarioRepository.save(usuarioAtualizado);
               return modelMapper.map(atualizado, UsuarioDTO.class);
          }
          throw new RuntimeException("Usuário não encontrado");
     }

     public void deletar(Long id) {
          usuarioRepository.deleteById(id);
     }
}
