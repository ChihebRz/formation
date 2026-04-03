package com.gestion.formation.repository;

import com.gestion.formation.entity.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeurRepository extends JpaRepository<Employeur, Integer> {
}

