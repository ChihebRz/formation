package com.gestion.formation.service;

import com.gestion.formation.entity.Employeur;
import com.gestion.formation.repository.EmployeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeurService {

    @Autowired
    private EmployeurRepository employeurRepository;

    public List<Employeur> findAll() {
        return employeurRepository.findAll();
    }

    public Employeur findById(Integer id) {
        return employeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employeur non trouvé"));
    }

    public Employeur save(Employeur e) {
        return employeurRepository.save(e);
    }

    public Employeur update(Integer id, Employeur e) {
        e.setId(id);
        return employeurRepository.save(e);
    }

    public void delete(Integer id) {
        employeurRepository.deleteById(id);
    }
}

