package com.gestion.formation.service;

import com.gestion.formation.entity.Utilisateur;
import com.gestion.formation.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur findById(Integer id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public Utilisateur save(Utilisateur u) {
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        return utilisateurRepository.save(u);
    }

    public Utilisateur update(Integer id, Utilisateur u) {
        u.setId(id);
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        return utilisateurRepository.save(u);
    }

    public void delete(Integer id) {
        utilisateurRepository.deleteById(id);
    }
}

