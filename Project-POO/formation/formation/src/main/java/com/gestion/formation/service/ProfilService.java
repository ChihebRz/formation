package com.gestion.formation.service;

import com.gestion.formation.entity.Profil;
import com.gestion.formation.repository.ProfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfilService {

    @Autowired
    private ProfilRepository profilRepository;

    public List<Profil> findAll() {
        return profilRepository.findAll();
    }

    public Profil findById(Integer id) {
        return profilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profil non trouvé"));
    }

    public Profil save(Profil p) {
        return profilRepository.save(p);
    }

    public Profil update(Integer id, Profil p) {
        p.setId(id);
        return profilRepository.save(p);
    }

    public void delete(Integer id) {
        profilRepository.deleteById(id);
    }
}

