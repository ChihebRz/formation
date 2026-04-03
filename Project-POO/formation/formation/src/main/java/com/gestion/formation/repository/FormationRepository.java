package com.gestion.formation.repository;

import com.gestion.formation.entity.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findByAnnee(Integer annee);
    List<Formation> findByDomaine_Id(Integer domaineId);
}

