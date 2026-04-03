package com.gestion.formation.controller;

import com.gestion.formation.entity.Domaine;
import com.gestion.formation.service.DomaineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/domaines")
public class DomaineController {

    @Autowired
    private DomaineService domaineService;

    @GetMapping
    public List<Domaine> getAll() {
        return domaineService.findAll();
    }

    @GetMapping("/{id}")
    public Domaine getById(@PathVariable Integer id) {
        return domaineService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Domaine> create(@Valid @RequestBody Domaine domaine) {
        return ResponseEntity.ok(domaineService.save(domaine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> update(@PathVariable Integer id,
                                           @Valid @RequestBody Domaine domaine) {
        return ResponseEntity.ok(domaineService.update(id, domaine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        domaineService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

