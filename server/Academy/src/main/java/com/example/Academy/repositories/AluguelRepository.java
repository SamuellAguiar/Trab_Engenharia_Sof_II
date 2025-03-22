package com.example.Academy.repositories;

import com.example.Academy.entities.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
     // Métodos de consulta personalizados podem ser adicionados aqui, se necessário
}
