package com.gestion.formation.service;

import com.gestion.formation.entity.Participant;
import com.gestion.formation.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public List<Participant> findAll() {
        return participantRepository.findAll();
    }

    public Participant findById(Integer id) {
        return participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant non trouvé"));
    }

    public Participant save(Participant p) {
        return participantRepository.save(p);
    }

    public Participant update(Integer id, Participant p) {
        p.setId(id);
        return participantRepository.save(p);
    }

    public void delete(Integer id) {
        participantRepository.deleteById(id);
    }

    public List<Participant> findByStructure(Integer structureId) {
        return participantRepository.findByStructure_Id(structureId);
    }
}

