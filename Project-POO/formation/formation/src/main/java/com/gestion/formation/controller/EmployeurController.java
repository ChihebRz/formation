package com.gestion.formation.controller;

import com.gestion.formation.entity.Employeur;
import com.gestion.formation.service.EmployeurService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employeurs")
public class EmployeurController {

    @Autowired
    private EmployeurService employeurService;

    @GetMapping
    public List<Employeur> getAll() {
        return employeurService.findAll();
    }

    @GetMapping("/{id}")
    public Employeur getById(@PathVariable Integer id) {
        return employeurService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Employeur> create(@Valid @RequestBody Employeur employeur) {
        return ResponseEntity.ok(employeurService.save(employeur));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> update(@PathVariable Integer id,
                                             @Valid @RequestBody Employeur employeur) {
        return ResponseEntity.ok(employeurService.update(id, employeur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        employeurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

