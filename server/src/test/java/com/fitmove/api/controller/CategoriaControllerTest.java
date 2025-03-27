package com.fitmove.api.controller;

import com.fitmove.api.model.Categoria;
import com.fitmove.api.service.CategoriaService;
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
class CategoriaControllerTest {

     @Mock
     private CategoriaService categoriaService;

     @InjectMocks
     private CategoriaController categoriaController;

     private MockMvc mockMvc;

     @Test
     void testGetAllCategorias() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(categoriaController).build();

          Categoria categoria1 = new Categoria();
          categoria1.setId(1L);
          Categoria categoria2 = new Categoria();
          categoria2.setId(2L);

          List<Categoria> categorias = Arrays.asList(categoria1, categoria2);
          when(categoriaService.findAll()).thenReturn(categorias);

          mockMvc.perform(get("/categorias"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2));
     }

     @Test
     void testGetCategoriaById() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(categoriaController).build();

          Categoria categoria = new Categoria();
          categoria.setId(1L);
          when(categoriaService.findById(1L)).thenReturn(categoria);

          mockMvc.perform(get("/categorias/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1));
     }

     @Test
     void testCreateCategoria() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(categoriaController).build();

          Categoria categoria = new Categoria();
          categoria.setId(1L);
          when(categoriaService.save(any(Categoria.class))).thenReturn(categoria);

          mockMvc.perform(post("/categorias")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"id\":1}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1));
     }

     @Test
     void testDeleteCategoria() throws Exception {
          mockMvc = MockMvcBuilders.standaloneSetup(categoriaController).build();

          doNothing().when(categoriaService).delete(1L);

          mockMvc.perform(delete("/categorias/1"))
                    .andExpect(status().isNoContent());
     }
}