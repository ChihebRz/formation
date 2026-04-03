package com.gestion.formation.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "formations")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String titre;

    @Min(2000)
    @Column(nullable = false)
    private Integer annee;

    @Min(1)
    @Column(nullable = false)
    private Integer duree;

    @PositiveOrZero
    private Double budget;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "id_domaine")
    private Domaine domaine;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "id_formateur")
    private Formateur formateur;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "formation_participant",
        joinColumns = @JoinColumn(name = "id_formation"),
        inverseJoinColumns = @JoinColumn(name = "id_participant")
    )
    private List<Participant> participants;

    public Formation() {}

    public Formation(Long id, String titre, Integer annee, Integer duree, Double budget, Domaine domaine, Formateur formateur, List<Participant> participants) {
        this.id = id;
        this.titre = titre;
        this.annee = annee;
        this.duree = duree;
        this.budget = budget;
        this.domaine = domaine;
        this.formateur = formateur;
        this.participants = participants;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public Integer getAnnee() { return annee; }
    public void setAnnee(Integer annee) { this.annee = annee; }

    public Integer getDuree() { return duree; }
    public void setDuree(Integer duree) { this.duree = duree; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public Domaine getDomaine() { return domaine; }
    public void setDomaine(Domaine domaine) { this.domaine = domaine; }

    public Formateur getFormateur() { return formateur; }
    public void setFormateur(Formateur formateur) { this.formateur = formateur; }

    public List<Participant> getParticipants() { return participants; }
    public void setParticipants(List<Participant> participants) { this.participants = participants; }
}



