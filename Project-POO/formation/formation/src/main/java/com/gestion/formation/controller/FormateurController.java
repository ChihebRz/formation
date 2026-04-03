package com.gestion.formation.controller;

import com.gestion.formation.entity.Formateur;
import com.gestion.formation.service.FormateurService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formateurs")
public class FormateurController {

    @Autowired
    private FormateurService formateurService;

    @GetMapping
    public List<Formateur> getAll() {
        return formateurService.findAll();
    }

    @GetMapping("/{id}")
    public Formateur getById(@PathVariable Integer id) {
        return formateurService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Formateur> create(@Valid @RequestBody Formateur formateur) {
        return ResponseEntity.ok(formateurService.save(formateur));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formateur> update(@PathVariable Integer id,
                                             @Valid @RequestBody Formateur formateur) {
        return ResponseEntity.ok(formateurService.update(id, formateur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        formateurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

