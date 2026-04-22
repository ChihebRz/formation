package com.gestion.formation.dto;

public class PlanningConflictItemDTO {

	private String type;
	private Long formationId;
	private String formationTitre;
	private Integer participantId;
	private String participantNom;
	private String details;

	public PlanningConflictItemDTO() {
	}

	public PlanningConflictItemDTO(String type, Long formationId, String formationTitre, Integer participantId, String participantNom, String details) {
		this.type = type;
		this.formationId = formationId;
		this.formationTitre = formationTitre;
		this.participantId = participantId;
		this.participantNom = participantNom;
		this.details = details;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public Integer getParticipantId() {
		return participantId;
	}

	public void setParticipantId(Integer participantId) {
		this.participantId = participantId;
	}

	public String getParticipantNom() {
		return participantNom;
	}

	public void setParticipantNom(String participantNom) {
		this.participantNom = participantNom;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
}

