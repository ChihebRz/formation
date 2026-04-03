package com.gestion.formation.service;

import com.gestion.formation.entity.Formation;
import com.gestion.formation.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;

    public List<Formation> findAll() {
        return formationRepository.findAll();
    }

    public Formation findById(Long id) {
        return formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));
    }

    public Formation save(Formation f) {
        return formationRepository.save(f);
    }

    public Formation update(Long id, Formation f) {
        f.setId(id);
        return formationRepository.save(f);
    }

    public void delete(Long id) {
        formationRepository.deleteById(id);
    }

    public List<Formation> findByAnnee(Integer annee) {
        return formationRepository.findByAnnee(annee);
    }
}

