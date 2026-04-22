package com.gestion.formation.repository;

import com.gestion.formation.entity.Planning;
import com.gestion.formation.entity.Formateur;
import com.gestion.formation.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PlanningRepository extends JpaRepository<Planning, Long> {
    
    // Trouver tous les plannings d'une formation
    List<Planning> findByFormationId(Long formationId);
    
    // Trouver tous les plannings d'un formateur
    List<Planning> findByFormateurId(Long formateurId);
    
    // Vérifier les conflits du formateur (même formateur, dates qui se chevauchent)
    @Query("SELECT p FROM Planning p WHERE p.formateur.id = :formateurId " +
           "AND ((p.dateDebut <= :dateDebut AND p.dateFin >= :dateDebut) " +
           "OR (p.dateDebut <= :dateFin AND p.dateFin >= :dateFin) " +
           "OR (p.dateDebut >= :dateDebut AND p.dateFin <= :dateFin)) " +
           "AND p.status IN ('PLANIFIE', 'EN_COURS')")
    List<Planning> findConflictingFormateurPlannings(
        @Param("formateurId") Integer formateurId,
        @Param("dateDebut") LocalDate dateDebut,
        @Param("dateFin") LocalDate dateFin
    );
    
    // Vérifier les conflits de lieu (même lieu, dates qui se chevauchent)
    @Query("SELECT p FROM Planning p WHERE p.lieu = :lieu " +
           "AND ((p.dateDebut <= :dateDebut AND p.dateFin >= :dateDebut) " +
           "OR (p.dateDebut <= :dateFin AND p.dateFin >= :dateFin) " +
           "OR (p.dateDebut >= :dateDebut AND p.dateFin <= :dateFin)) " +
           "AND p.status IN ('PLANIFIE', 'EN_COURS')")
    List<Planning> findConflictingLieuPlannings(
        @Param("lieu") String lieu,
        @Param("dateDebut") LocalDate dateDebut,
        @Param("dateFin") LocalDate dateFin
    );
    
    // Vérifier si un participant est déjà affecté pendant cette période
    @Query("SELECT p FROM Planning p JOIN p.participants part " +
           "WHERE part.id = :participantId " +
           "AND ((p.dateDebut <= :dateDebut AND p.dateFin >= :dateDebut) " +
           "OR (p.dateDebut <= :dateFin AND p.dateFin >= :dateFin) " +
           "OR (p.dateDebut >= :dateDebut AND p.dateFin <= :dateFin)) " +
           "AND p.status IN ('PLANIFIE', 'EN_COURS')")
    List<Planning> findConflictingParticipantPlannings(
        @Param("participantId") Integer participantId,
        @Param("dateDebut") LocalDate dateDebut,
        @Param("dateFin") LocalDate dateFin
    );
    
    // Lister tous les plannings pour une période
    List<Planning> findByDateDebutBetweenOrDateFinBetween(
        LocalDate dateDebut1, LocalDate dateFin1,
        LocalDate dateDebut2, LocalDate dateFin2
    );
    
    // Trouver les plannings par statut
    List<Planning> findByStatus(String status);
}



