package com.gestion.formation.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "employeurs")
public class Employeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "nom_employeur", nullable = false)
    private String nomEmployeur;

    public Employeur() {}

    public Employeur(Integer id, String nomEmployeur) {
        this.id = id;
        this.nomEmployeur = nomEmployeur;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNomEmployeur() { return nomEmployeur; }
    public void setNomEmployeur(String nomEmployeur) { this.nomEmployeur = nomEmployeur; }
}


