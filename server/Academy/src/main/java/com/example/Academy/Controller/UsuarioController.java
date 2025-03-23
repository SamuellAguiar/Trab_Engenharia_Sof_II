package com.example.Academy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Academy.dto.UsuarioDTO;
import com.example.Academy.entities.Usuario;
import com.example.Academy.services.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

     @Autowired
     private UsuarioService usuarioService;

     @PostMapping("/cadastrar")
     public ResponseEntity<UsuarioDTO> criarUsuarioSeguro(@Valid @RequestBody Usuario usuario) {
          UsuarioDTO novoUsuario = usuarioService.cadastrarUsuarioSeguro(usuario);
          return ResponseEntity.ok(novoUsuario);
     }

     @PostMapping("/autenticar")
     public ResponseEntity<String> autenticarUsuario(@RequestBody Usuario usuario) {
          boolean autenticado = usuarioService.autenticarUsuario(usuario.getEmail(), usuario.getSenha());
          return autenticado ? ResponseEntity.ok("Autenticação bem-sucedida")
                    : ResponseEntity.status(401).body("Credenciais inválidas");
     }

     @GetMapping
     public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
          return ResponseEntity.ok(usuarioService.listarTodos());
     }

     @GetMapping("/{id}")
     public ResponseEntity<UsuarioDTO> buscarUsuario(@PathVariable Long id) {
          Optional<UsuarioDTO> usuario = usuarioService.buscarPorId(id);
          return usuario.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
     }

     @PutMapping("/{id}")
     public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
          UsuarioDTO atualizado = usuarioService.atualizar(id, usuario);
          return ResponseEntity.ok(atualizado);
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
          usuarioService.deletar(id);
          return ResponseEntity.noContent().build();
     }
}
