package com.example.Academy.repositories;

import com.example.Academy.entities.Plano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoRepository extends JpaRepository<Plano, Long> {
    // Aqui você pode definir métodos personalizados de consulta, se necessário
}
