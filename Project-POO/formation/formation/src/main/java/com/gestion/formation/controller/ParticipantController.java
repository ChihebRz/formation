package com.gestion.formation.controller;

import com.gestion.formation.entity.Participant;
import com.gestion.formation.service.ParticipantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping
    public List<Participant> getAll() {
        return participantService.findAll();
    }

    @GetMapping("/{id}")
    public Participant getById(@PathVariable Integer id) {
        return participantService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Participant> create(@Valid @RequestBody Participant participant) {
        return ResponseEntity.ok(participantService.save(participant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participant> update(@PathVariable Integer id,
                                               @Valid @RequestBody Participant participant) {
        return ResponseEntity.ok(participantService.update(id, participant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        participantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

