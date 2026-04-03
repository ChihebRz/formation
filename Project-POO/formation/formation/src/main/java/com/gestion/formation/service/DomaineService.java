package com.gestion.formation.service;

import com.gestion.formation.entity.Domaine;
import com.gestion.formation.repository.DomaineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DomaineService {

    @Autowired
    private DomaineRepository domaineRepository;

    public List<Domaine> findAll() {
        return domaineRepository.findAll();
    }

    public Domaine findById(Integer id) {
        return domaineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Domaine non trouvé"));
    }

    public Domaine save(Domaine d) {
        return domaineRepository.save(d);
    }

    public Domaine update(Integer id, Domaine d) {
        d.setId(id);
        return domaineRepository.save(d);
    }

    public void delete(Integer id) {
        domaineRepository.deleteById(id);
    }
}

