package com.gestion.formation.repository;

import com.gestion.formation.entity.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormateurRepository extends JpaRepository<Formateur, Integer> {
}

