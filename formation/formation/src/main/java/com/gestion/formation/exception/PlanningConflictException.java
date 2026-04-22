package com.gestion.formation.exception;

import com.gestion.formation.dto.PlanningConflictItemDTO;
import java.util.List;

public class PlanningConflictException extends RuntimeException {

    private final List<PlanningConflictItemDTO> conflicts;

    public PlanningConflictException(String message, List<PlanningConflictItemDTO> conflicts) {
        super(message);
        this.conflicts = conflicts;
    }

    public List<PlanningConflictItemDTO> getConflicts() {
        return conflicts;
    }
}

