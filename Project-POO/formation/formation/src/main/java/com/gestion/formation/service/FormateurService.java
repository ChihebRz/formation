package com.gestion.formation.service;

import com.gestion.formation.entity.Formateur;
import com.gestion.formation.repository.FormateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormateurService {

    @Autowired
    private FormateurRepository formateurRepository;

    public List<Formateur> findAll() {
        return formateurRepository.findAll();
    }

    public Formateur findById(Integer id) {
        return formateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formateur non trouvé"));
    }

    public Formateur save(Formateur f) {
        return formateurRepository.save(f);
    }

    public Formateur update(Integer id, Formateur f) {
        f.setId(id);
        return formateurRepository.save(f);
    }

    public void delete(Integer id) {
        formateurRepository.deleteById(id);
    }
}

