package com.fitmove.api.controller;

import com.fitmove.api.model.Plano;
import com.fitmove.api.service.PlanoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PlanoController.class)
class PlanoControllerTest {

     @Autowired
     private MockMvc mockMvc;

     @MockBean
     private PlanoService planoService;

     private Plano plano;

     @BeforeEach
     void setUp() {
          plano = new Plano();
          plano.setId(1L);
          plano.setNome("Plano Premium");
     }

     @Test
     void getAllPlanos_ShouldReturnListOfPlanos() throws Exception {
          when(planoService.findPlanos(null, null, null)).thenReturn(List.of(plano));

          mockMvc.perform(MockMvcRequestBuilders.get("/planos"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(plano.getId()))
                    .andExpect(jsonPath("$[0].nome").value(plano.getNome()));
     }

     @Test
     void getPlanoById_ShouldReturnPlano() throws Exception {
          when(planoService.findById(1L)).thenReturn(plano);

          mockMvc.perform(MockMvcRequestBuilders.get("/planos/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(plano.getId()))
                    .andExpect(jsonPath("$.nome").value(plano.getNome()));
     }

     @Test
     void getPlanosDestaque_ShouldReturnHighlightedPlanos() throws Exception {
          when(planoService.findByDestaque(true)).thenReturn(List.of(plano));

          mockMvc.perform(MockMvcRequestBuilders.get("/planos/destaque"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(plano.getId()))
                    .andExpect(jsonPath("$[0].nome").value(plano.getNome()));
     }

     @Test
     void createPlano_ShouldReturnCreatedPlano() throws Exception {
          when(planoService.save(any(Plano.class))).thenReturn(plano);

          mockMvc.perform(MockMvcRequestBuilders.post("/planos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"nome\":\"Plano Premium\"}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(plano.getId()))
                    .andExpect(jsonPath("$.nome").value(plano.getNome()));
     }

     @Test
     void updatePlano_ShouldReturnUpdatedPlano() throws Exception {
          when(planoService.save(any(Plano.class))).thenReturn(plano);

          mockMvc.perform(MockMvcRequestBuilders.put("/planos/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"nome\":\"Plano Atualizado\"}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(plano.getId()));
     }

     @Test
     void deletePlano_ShouldReturnNoContent() throws Exception {
          doNothing().when(planoService).delete(1L);

          mockMvc.perform(MockMvcRequestBuilders.delete("/planos/1"))
                    .andExpect(status().isNoContent());
     }
}
