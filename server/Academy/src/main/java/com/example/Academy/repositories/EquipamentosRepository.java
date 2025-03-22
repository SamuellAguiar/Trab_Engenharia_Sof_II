package com.example.Academy.repositories;

import com.example.Academy.entities.Equipamentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipamentosRepository extends JpaRepository<Equipamentos, Long> {
    // Métodos de consulta personalizados podem ser adicionados aqui, se necessário
}
