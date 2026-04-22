package com.gestion.formation.dto;

import java.time.LocalDate;

public class PlanningEventDTO {

    private Long id;
    private String titre;
    private LocalDate startDate;
    private LocalDate endDate;
    private String lieu;
    private Integer formateurId;
    private String formateurNom;
    private Integer participantsCount;

    public PlanningEventDTO() {
    }

    public PlanningEventDTO(Long id, String titre, LocalDate startDate, LocalDate endDate, String lieu, Integer formateurId, String formateurNom, Integer participantsCount) {
        this.id = id;
        this.titre = titre;
        this.startDate = startDate;
        this.endDate = endDate;
        this.lieu = lieu;
        this.formateurId = formateurId;
        this.formateurNom = formateurNom;
        this.participantsCount = participantsCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Integer getFormateurId() {
        return formateurId;
    }

    public void setFormateurId(Integer formateurId) {
        this.formateurId = formateurId;
    }

    public String getFormateurNom() {
        return formateurNom;
    }

    public void setFormateurNom(String formateurNom) {
        this.formateurNom = formateurNom;
    }

    public Integer getParticipantsCount() {
        return participantsCount;
    }

    public void setParticipantsCount(Integer participantsCount) {
        this.participantsCount = participantsCount;
    }
}

