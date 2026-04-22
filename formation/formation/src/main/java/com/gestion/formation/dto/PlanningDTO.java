package com.gestion.formation.dto;

import java.time.LocalDate;
import java.util.List;

public class PlanningDTO {
    
    private Long id;
    private Long formationId;
    private String formationTitre;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String lieu;
    private Long formateurId;
    private String formateurNom;
    private List<Long> participantIds;
    private String status;
    private LocalDate createdAt;

    // Constructors
    public PlanningDTO() {}

    public PlanningDTO(Long id, Long formationId, String formationTitre, LocalDate dateDebut, 
                      LocalDate dateFin, String lieu, Long formateurId, String formateurNom, 
                      List<Long> participantIds, String status, LocalDate createdAt) {
        this.id = id;
        this.formationId = formationId;
        this.formationTitre = formationTitre;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.lieu = lieu;
        this.formateurId = formateurId;
        this.formateurNom = formateurNom;
        this.participantIds = participantIds;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFormationId() {
        return formationId;
    }

    public void setFormationId(Long formationId) {
        this.formationId = formationId;
    }

    public String getFormationTitre() {
        return formationTitre;
    }

    public void setFormationTitre(String formationTitre) {
        this.formationTitre = formationTitre;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Long getFormateurId() {
        return formateurId;
    }

    public void setFormateurId(Long formateurId) {
        this.formateurId = formateurId;
    }

    public String getFormateurNom() {
        return formateurNom;
    }

    public void setFormateurNom(String formateurNom) {
        this.formateurNom = formateurNom;
    }

    public List<Long> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Long> participantIds) {
        this.participantIds = participantIds;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}

