package com.gestion.formation.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @NotBlank
    @Column(nullable = false)
    private String nom;

    @NotBlank
    @Column(nullable = false)
    private String description;

    @Min(2000)
    @Column(nullable = false)
    private Integer annee;

    @Min(1)
    @Column(nullable = false)
    private Integer duree;

    @PositiveOrZero
    private Double budget;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_domaine")
    private Domaine domaine;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_formateur")
    private Formateur formateur;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "formation_participant",
        joinColumns = @JoinColumn(name = "id_formation"),
        inverseJoinColumns = @JoinColumn(name = "id_participant")
    )
    @JsonIgnore
    private List<Participant> participants;

    public Formation() {}

    public Formation(Long id, String titre, String nom, String description, Integer annee, Integer duree, Double budget, Domaine domaine, Formateur formateur, List<Participant> participants) {
        this.id = id;
        this.titre = titre;
        this.nom = nom;
        this.description = description;
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

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

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
















