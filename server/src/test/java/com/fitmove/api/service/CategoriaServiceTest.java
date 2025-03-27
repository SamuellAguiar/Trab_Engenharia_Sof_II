package com.fitmove.api.service;

import com.fitmove.api.model.Categoria;
import com.fitmove.api.repository.CategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoriaServiceTest {

     @Mock
     private CategoriaRepository categoriaRepository;

     @InjectMocks
     private CategoriaService categoriaService;

     private Categoria categoria1;
     private Categoria categoria2;

     @BeforeEach
     void setUp() {
          categoria1 = new Categoria();
          categoria1.setId(1L);
          categoria1.setSlug("categoria-teste-1");

          categoria2 = new Categoria();
          categoria2.setId(2L);
          categoria2.setSlug("categoria-teste-2");
     }

     @Test
     void testFindAll() {
          when(categoriaRepository.findAll()).thenReturn(Arrays.asList(categoria1, categoria2));
          List<Categoria> result = categoriaService.findAll();
          assertEquals(2, result.size());
          verify(categoriaRepository, times(1)).findAll();
     }

     @Test
     void testFindById_ExistingId() {
          when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria1));
          Categoria result = categoriaService.findById(1L);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(categoriaRepository, times(1)).findById(1L);
     }

     @Test
     void testFindById_NonExistingId() {
          when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());
          assertThrows(EntityNotFoundException.class, () -> categoriaService.findById(99L));
          verify(categoriaRepository, times(1)).findById(99L);
     }

     @Test
     void testFindBySlug_ExistingSlug() {
          when(categoriaRepository.findBySlug("categoria-teste-1")).thenReturn(Optional.of(categoria1));
          Categoria result = categoriaService.findBySlug("categoria-teste-1");
          assertNotNull(result);
          assertEquals("categoria-teste-1", result.getSlug());
          verify(categoriaRepository, times(1)).findBySlug("categoria-teste-1");
     }

     @Test
     void testFindBySlug_NonExistingSlug() {
          when(categoriaRepository.findBySlug("nao-existe")).thenReturn(Optional.empty());
          assertThrows(EntityNotFoundException.class, () -> categoriaService.findBySlug("nao-existe"));
          verify(categoriaRepository, times(1)).findBySlug("nao-existe");
     }

     @Test
     void testSave() {
          when(categoriaRepository.save(categoria1)).thenReturn(categoria1);
          Categoria result = categoriaService.save(categoria1);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(categoriaRepository, times(1)).save(categoria1);
     }

     @Test
     void testDelete() {
          doNothing().when(categoriaRepository).deleteById(1L);
          categoriaService.delete(1L);
          verify(categoriaRepository, times(1)).deleteById(1L);
     }
}
