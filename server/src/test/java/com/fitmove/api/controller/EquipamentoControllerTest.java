package com.fitmove.api.controller;

import com.fitmove.api.model.Equipamento;
import com.fitmove.api.service.EquipamentoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class EquipamentoControllerTest {

     @Mock
     private EquipamentoService equipamentoService;

     @InjectMocks
     private EquipamentoController equipamentoController;

     private MockMvc mockMvc;

     @Test
     void testGetAllEquipamentos() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(equipamentoController).build();

          Equipamento equipamento1 = new Equipamento();
          equipamento1.setId(1L);
          Equipamento equipamento2 = new Equipamento();
          equipamento2.setId(2L);

          List<Equipamento> equipamentos = Arrays.asList(equipamento1, equipamento2);
          when(equipamentoService.findEquipamentos(null, null, null, null)).thenReturn(equipamentos);

          mockMvc.perform(get("/equipamentos/buscarTodos"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2));
     }

     @Test
     void testGetEquipamentoById() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(equipamentoController).build();

          Equipamento equipamento = new Equipamento();
          equipamento.setId(1L);
          when(equipamentoService.findById(1L)).thenReturn(equipamento);

          mockMvc.perform(get("/equipamentos/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1));
     }

     @Test
     void testCreateEquipamento() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(equipamentoController).build();

          Equipamento equipamento = new Equipamento();
          equipamento.setId(1L);
          when(equipamentoService.save(any(Equipamento.class))).thenReturn(equipamento);

          mockMvc.perform(post("/equipamentos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"id\":1}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1));
     }

     @Test
     void testDeleteEquipamento() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(equipamentoController).build();

          doNothing().when(equipamentoService).delete(1L);

          mockMvc.perform(delete("/equipamentos/1"))
                    .andExpect(status().isNoContent());
     }
}
