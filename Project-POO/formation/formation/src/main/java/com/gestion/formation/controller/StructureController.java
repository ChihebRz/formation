package com.gestion.formation.controller;

import com.gestion.formation.entity.Structure;
import com.gestion.formation.service.StructureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/structures")
public class StructureController {

    @Autowired
    private StructureService structureService;

    @GetMapping
    public List<Structure> getAll() {
        return structureService.findAll();
    }

    @GetMapping("/{id}")
    public Structure getById(@PathVariable Integer id) {
        return structureService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Structure> create(@Valid @RequestBody Structure structure) {
        return ResponseEntity.ok(structureService.save(structure));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Structure> update(@PathVariable Integer id,
                                             @Valid @RequestBody Structure structure) {
        return ResponseEntity.ok(structureService.update(id, structure));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        structureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

