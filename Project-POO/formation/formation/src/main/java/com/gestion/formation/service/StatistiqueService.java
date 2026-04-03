package com.gestion.formation.service;

import com.gestion.formation.repository.FormationRepository;
import com.gestion.formation.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StatistiqueService {

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    public Map<String, Object> getStatistiques() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalFormations", formationRepository.count());
        stats.put("totalParticipants", participantRepository.count());
        return stats;
    }
}

