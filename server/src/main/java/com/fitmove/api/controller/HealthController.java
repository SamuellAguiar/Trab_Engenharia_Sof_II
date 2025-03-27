package com.fitmove.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador para verificação de saúde da API
 * Usado pelo frontend para verificar se o backend está disponível
 */
@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "FitMove API está funcionando corretamente");
        response.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }
}
