package com.gestion.formation.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ParticipantAssignmentRequest {

    @NotNull
    private List<Integer> participantIds;

    public List<Integer> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }
}

