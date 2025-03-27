package com.fitmove.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador para verificar a saúde da conexão com o banco de dados
 */
@RestController
@RequestMapping("/db-health")
public class DatabaseHealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<Map<String, Object>> checkDatabaseHealth() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Tenta executar uma consulta simples
            String dbStatus = jdbcTemplate.queryForObject("SELECT 'UP' as status", String.class);
            
            response.put("status", dbStatus);
            response.put("message", "Conexão com o banco de dados está funcionando");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "DOWN");
            response.put("message", "Erro na conexão com o banco de dados: " + e.getMessage());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(503).body(response);
        }
    }
}

