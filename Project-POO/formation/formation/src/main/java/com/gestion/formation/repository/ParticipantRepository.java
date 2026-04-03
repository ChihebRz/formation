package com.gestion.formation.repository;

import com.gestion.formation.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    List<Participant> findByStructure_Id(Integer structureId);
}

