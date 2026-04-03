package com.gestion.formation.controller;

import com.gestion.formation.entity.Profil;
import com.gestion.formation.service.ProfilService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/profils")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @GetMapping
    public List<Profil> getAll() {
        return profilService.findAll();
    }

    @GetMapping("/{id}")
    public Profil getById(@PathVariable Integer id) {
        return profilService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Profil> create(@Valid @RequestBody Profil profil) {
        return ResponseEntity.ok(profilService.save(profil));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> update(@PathVariable Integer id,
                                          @Valid @RequestBody Profil profil) {
        return ResponseEntity.ok(profilService.update(id, profil));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        profilService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

