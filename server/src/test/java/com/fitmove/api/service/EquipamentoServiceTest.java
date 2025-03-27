package com.fitmove.api.service;

import com.fitmove.api.model.Equipamento;
import com.fitmove.api.repository.EquipamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EquipamentoServiceTest {

     @Mock
     private EquipamentoRepository equipamentoRepository;

     @InjectMocks
     private EquipamentoService equipamentoService;

     private Equipamento equipamento1;
     private Equipamento equipamento2;

     @BeforeEach
     void setUp() {
          equipamento1 = new Equipamento();
          equipamento1.setId(1L);
          equipamento1.setMarca("Marca A");
          equipamento1.setPrecoMensal(new BigDecimal("100.00"));

          equipamento2 = new Equipamento();
          equipamento2.setId(2L);
          equipamento2.setMarca("Marca B");
          equipamento2.setPrecoMensal(new BigDecimal("200.00"));
     }

     @Test
     void testFindAll() {
          when(equipamentoRepository.findAll()).thenReturn(Arrays.asList(equipamento1, equipamento2));
          List<Equipamento> result = equipamentoService.findAll();
          assertEquals(2, result.size());
          verify(equipamentoRepository, times(1)).findAll();
     }

     @Test
     void testFindById_ExistingId() {
          when(equipamentoRepository.findById(1L)).thenReturn(Optional.of(equipamento1));
          Equipamento result = equipamentoService.findById(1L);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(equipamentoRepository, times(1)).findById(1L);
     }

     @Test
     void testFindById_NonExistingId() {
          when(equipamentoRepository.findById(99L)).thenReturn(Optional.empty());
          assertThrows(EntityNotFoundException.class, () -> equipamentoService.findById(99L));
          verify(equipamentoRepository, times(1)).findById(99L);
     }

     @Test
     void testSave() {
          when(equipamentoRepository.save(equipamento1)).thenReturn(equipamento1);
          Equipamento result = equipamentoService.save(equipamento1);
          assertNotNull(result);
          assertEquals(1L, result.getId());
          verify(equipamentoRepository, times(1)).save(equipamento1);
     }

     @Test
     void testDelete() {
          doNothing().when(equipamentoRepository).deleteById(1L);
          equipamentoService.delete(1L);
          verify(equipamentoRepository, times(1)).deleteById(1L);
     }
}