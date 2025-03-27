package com.fitmove.api.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class DatabaseHealthControllerTest {

     @InjectMocks
     private DatabaseHealthController databaseHealthController;

     @MockBean
     private JdbcTemplate jdbcTemplate;

     @Test
     void testCheckDatabaseHealth_WhenDatabaseIsUp() {
          when(jdbcTemplate.queryForObject("SELECT 'UP' as status", String.class)).thenReturn("UP");

          ResponseEntity<Map<String, Object>> response = databaseHealthController.checkDatabaseHealth();

          assertEquals(200, response.getStatusCodeValue());
          assertEquals("UP", response.getBody().get("status"));
          assertEquals("Conexão com o banco de dados está funcionando", response.getBody().get("message"));
     }

     @Test
     void testCheckDatabaseHealth_WhenDatabaseIsDown() {
          when(jdbcTemplate.queryForObject(anyString(), eq(String.class)))
                    .thenThrow(new RuntimeException("Database error"));

          ResponseEntity<Map<String, Object>> response = databaseHealthController.checkDatabaseHealth();

          assertEquals(503, response.getStatusCodeValue());
          assertEquals("DOWN", response.getBody().get("status"));
          assertTrue(response.getBody().get("message").toString().contains("Erro na conexão com o banco de dados"));
     }
}