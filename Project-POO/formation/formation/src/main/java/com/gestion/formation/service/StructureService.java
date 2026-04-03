package com.gestion.formation.service;

import com.gestion.formation.entity.Structure;
import com.gestion.formation.repository.StructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StructureService {

    @Autowired
    private StructureRepository structureRepository;

    public List<Structure> findAll() {
        return structureRepository.findAll();
    }

    public Structure findById(Integer id) {
        return structureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Structure non trouvée"));
    }

    public Structure save(Structure s) {
        return structureRepository.save(s);
    }

    public Structure update(Integer id, Structure s) {
        s.setId(id);
        return structureRepository.save(s);
    }

    public void delete(Integer id) {
        structureRepository.deleteById(id);
    }
}

