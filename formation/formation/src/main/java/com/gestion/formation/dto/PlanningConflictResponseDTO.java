package com.gestion.formation.dto;

import java.util.List;

public class PlanningConflictResponseDTO {

    private String code;
    private String message;
    private List<PlanningConflictItemDTO> conflicts;

    public PlanningConflictResponseDTO() {
    }

    public PlanningConflictResponseDTO(String code, String message, List<PlanningConflictItemDTO> conflicts) {
        this.code = code;
        this.message = message;
        this.conflicts = conflicts;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<PlanningConflictItemDTO> getConflicts() {
        return conflicts;
    }

    public void setConflicts(List<PlanningConflictItemDTO> conflicts) {
        this.conflicts = conflicts;
    }
}

