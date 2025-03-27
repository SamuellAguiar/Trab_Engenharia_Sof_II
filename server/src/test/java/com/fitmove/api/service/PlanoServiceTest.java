package com.fitmove.api.service;

import com.fitmove.api.model.Plano;
import com.fitmove.api.repository.PlanoRepository;
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
class PlanoServiceTest {

     @Mock
     private PlanoRepository planoRepository;

     @InjectMocks
     private PlanoService planoService;

     private Plano plano1;
     private Plano plano2;

     @BeforeEach
     void setUp() {
          plano1 = new Plano();
          plano1.setId(1L);
          plano1.setNivel("Iniciante");
          plano1.setDuracaoTipo("Mensal");

          plano2 = new Plano();
          plano2.setId(2L);
          plano2.setNivel("Avançado");
          plano2.setDuracaoTipo("Anual");
     }

     @Test
     void testFindAll() {
          when(planoRepository.findAll()).thenReturn(Arrays.asList(plano1, plano2));
          List<Plano> result = planoService.findAll();
          assertEquals(2, result.size());
          verify(planoRepository, times(1)).findAll();
     }

     @Test
     void testFindById_ExistingId() {
          when(planoRepository.findById(1L)).thenReturn(Optional.of(plano1));
          Plano result = planoService.findById(1L);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(planoRepository, times(1)).findById(1L);
     }

     @Test
     void testFindById_NonExistingId() {
          when(planoRepository.findById(99L)).thenReturn(Optional.empty());
          assertThrows(EntityNotFoundException.class, () -> planoService.findById(99L));
          verify(planoRepository, times(1)).findById(99L);
     }

     @Test
     void testSave() {
          when(planoRepository.save(plano1)).thenReturn(plano1);
          Plano result = planoService.save(plano1);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(planoRepository, times(1)).save(plano1);
     }

     @Test
     void testDelete() {
          doNothing().when(planoRepository).deleteById(1L);
          planoService.delete(1L);
          verify(planoRepository, times(1)).deleteById(1L);
     }
}