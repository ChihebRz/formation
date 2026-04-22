package com.gestion.formation.service;

import com.gestion.formation.dto.PlanningDTO;
import com.gestion.formation.entity.*;
import com.gestion.formation.exception.ResourceNotFoundException;
import com.gestion.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanningService {

    @Autowired
    private PlanningRepository planningRepository;
    
    @Autowired
    private FormationRepository formationRepository;
    
    @Autowired
    private FormateurRepository formateurRepository;
    
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private PlanningEmailNotificationService planningEmailNotificationService;

    /**
     * Créer un nouveau planning avec vérification des conflits
     */
    public PlanningDTO createPlanning(PlanningDTO planningDTO) {
        // Récupérer la formation
        Formation formation = formationRepository.findById(planningDTO.getFormationId())
            .orElseThrow(() -> new ResourceNotFoundException("Formation non trouvée"));
        
        // Récupérer le formateur
        Formateur formateur = formateurRepository.findById(planningDTO.getFormateurId().intValue())
            .orElseThrow(() -> new ResourceNotFoundException("Formateur non trouvé"));
        
        // Valider les dates
        if (planningDTO.getDateDebut().isAfter(planningDTO.getDateFin())) {
            throw new IllegalArgumentException("La date de début doit être avant la date de fin");
        }
        
        // Vérifier les conflits du formateur
        List<Planning> formateurConflicts = planningRepository.findConflictingFormateurPlannings(
            formateur.getId(),
            planningDTO.getDateDebut(),
            planningDTO.getDateFin()
        );
        
        if (!formateurConflicts.isEmpty()) {
            throw new IllegalArgumentException(
                "Conflit détecté: Le formateur " + formateur.getNom() + " " + formateur.getPrenom() + 
                " est déjà affecté pendant cette période"
            );
        }
        
        // Vérifier les conflits de lieu
        List<Planning> lieuConflicts = planningRepository.findConflictingLieuPlannings(
            planningDTO.getLieu(),
            planningDTO.getDateDebut(),
            planningDTO.getDateFin()
        );
        
        if (!lieuConflicts.isEmpty()) {
            throw new IllegalArgumentException(
                "Conflit détecté: Le lieu '" + planningDTO.getLieu() + 
                "' est déjà réservé pendant cette période"
            );
        }
        
        // Récupérer et valider les participants
        List<Participant> participants = null;
        if (planningDTO.getParticipantIds() != null && !planningDTO.getParticipantIds().isEmpty()) {
            participants = planningDTO.getParticipantIds().stream()
                .map(id -> {
                    Integer participantId = (id != null) ? id.intValue() : null;
                    return participantRepository.findById(participantId)
                        .orElseThrow(() -> new ResourceNotFoundException("Participant non trouvé avec l'ID: " + id));
                })
                .collect(Collectors.toList());
            
            // Vérifier les conflits des participants
            for (Participant participant : participants) {
                List<Planning> participantConflicts = planningRepository.findConflictingParticipantPlannings(
                    participant.getId(),
                    planningDTO.getDateDebut(),
                    planningDTO.getDateFin()
                );
                
                if (!participantConflicts.isEmpty()) {
                    throw new IllegalArgumentException(
                        "Conflit détecté: Le participant " + participant.getNom() + " " + 
                        participant.getPrenom() + " est déjà affecté à une formation pendant cette période"
                    );
                }
            }
        }

        List<Participant> notificationRecipients = resolveNotificationRecipients(formation, participants);
        
        // Créer le planning
        Planning planning = new Planning(formation, planningDTO.getDateDebut(), 
                                        planningDTO.getDateFin(), planningDTO.getLieu(),
                                        formateur, participants);
        planning.setStatus("PLANIFIE");
        
        Planning savedPlanning = planningRepository.save(planning);
        planningEmailNotificationService.notifyParticipants(savedPlanning, notificationRecipients, false);
        return convertToDTO(savedPlanning);
    }

    /**
     * Récupérer tous les plannings
     */
    public List<PlanningDTO> getAllPlannings() {
        return planningRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Récupérer un planning par ID
     */
    public PlanningDTO getPlanningById(Long id) {
        Planning planning = planningRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Planning non trouvé"));
        return convertToDTO(planning);
    }

    /**
     * Récupérer les plannings d'une formation
     */
    public List<PlanningDTO> getPlanningsByFormation(Long formationId) {
        return planningRepository.findByFormationId(formationId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Récupérer les plannings d'un formateur
     */
    public List<PlanningDTO> getPlanningsByFormateur(Long formateurId) {
        return planningRepository.findByFormateurId(formateurId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Mettre à jour un planning avec vérification des conflits
     */
    public PlanningDTO updatePlanning(Long id, PlanningDTO planningDTO) {
        Planning planning = planningRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Planning non trouvé"));
        
        // Récupérer la formation
        Formation formation = formationRepository.findById(planningDTO.getFormationId())
            .orElseThrow(() -> new ResourceNotFoundException("Formation non trouvée"));
        
        // Récupérer le formateur
        Formateur formateur = formateurRepository.findById(planningDTO.getFormateurId().intValue())
            .orElseThrow(() -> new ResourceNotFoundException("Formateur non trouvé"));
        
        // Valider les dates
        if (planningDTO.getDateDebut().isAfter(planningDTO.getDateFin())) {
            throw new IllegalArgumentException("La date de début doit être avant la date de fin");
        }
        
        // Vérifier les conflits du formateur (sauf pour le planning courant)
        List<Planning> formateurConflicts = planningRepository.findConflictingFormateurPlannings(
            formateur.getId(),
            planningDTO.getDateDebut(),
            planningDTO.getDateFin()
        );
        
        if (formateurConflicts.stream().anyMatch(p -> !p.getId().equals(id))) {
            throw new IllegalArgumentException(
                "Conflit détecté: Le formateur " + formateur.getNom() + " " + formateur.getPrenom() + 
                " est déjà affecté pendant cette période"
            );
        }
        
        // Vérifier les conflits de lieu (sauf pour le planning courant)
        List<Planning> lieuConflicts = planningRepository.findConflictingLieuPlannings(
            planningDTO.getLieu(),
            planningDTO.getDateDebut(),
            planningDTO.getDateFin()
        );
        
        if (lieuConflicts.stream().anyMatch(p -> !p.getId().equals(id))) {
            throw new IllegalArgumentException(
                "Conflit détecté: Le lieu '" + planningDTO.getLieu() + 
                "' est déjà réservé pendant cette période"
            );
        }
        
        // Mettre à jour les informations
        planning.setFormation(formation);
        planning.setFormateur(formateur);
        planning.setDateDebut(planningDTO.getDateDebut());
        planning.setDateFin(planningDTO.getDateFin());
        planning.setLieu(planningDTO.getLieu());
        planning.setStatus(planningDTO.getStatus() != null ? planningDTO.getStatus() : "PLANIFIE");
        
        // Récupérer et valider les participants
        if (planningDTO.getParticipantIds() != null && !planningDTO.getParticipantIds().isEmpty()) {
            List<Participant> participants = planningDTO.getParticipantIds().stream()
                .map(pid -> {
                    Integer participantId = (pid != null) ? pid.intValue() : null;
                    return participantRepository.findById(participantId)
                        .orElseThrow(() -> new ResourceNotFoundException("Participant non trouvé"));
                })
                .collect(Collectors.toList());
            planning.setParticipants(participants);
        }

        List<Participant> notificationRecipients = resolveNotificationRecipients(
            formation,
            planning.getParticipants()
        );
        
        Planning updatedPlanning = planningRepository.save(planning);
        planningEmailNotificationService.notifyParticipants(updatedPlanning, notificationRecipients, true);
        return convertToDTO(updatedPlanning);
    }

    /**
     * Supprimer un planning
     */
    public void deletePlanning(Long id) {
        Planning planning = planningRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Planning non trouvé"));
        planningRepository.delete(planning);
    }

    /**
     * Changer le statut d'un planning
     */
    public PlanningDTO updatePlanningStatus(Long id, String newStatus) {
        Planning planning = planningRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Planning non trouvé"));
        planning.setStatus(newStatus);
        Planning updatedPlanning = planningRepository.save(planning);
        return convertToDTO(updatedPlanning);
    }

    /**
     * Convertir une entité Planning en DTO
     */
    private PlanningDTO convertToDTO(Planning planning) {
        PlanningDTO dto = new PlanningDTO();
        dto.setId(planning.getId());
        dto.setFormationId((long) planning.getFormation().getId());
        dto.setFormationTitre(planning.getFormation().getTitre());
        dto.setDateDebut(planning.getDateDebut());
        dto.setDateFin(planning.getDateFin());
        dto.setLieu(planning.getLieu());
        dto.setFormateurId((long) planning.getFormateur().getId());
        dto.setFormateurNom(planning.getFormateur().getNom() + " " + planning.getFormateur().getPrenom());
        
        if (planning.getParticipants() != null) {
            dto.setParticipantIds(planning.getParticipants().stream()
                .map(p -> (long) p.getId())
                .collect(Collectors.toList()));
        }
        
        dto.setStatus(planning.getStatus());
        dto.setCreatedAt(planning.getCreatedAt());
        
        return dto;
    }

    private List<Participant> resolveNotificationRecipients(Formation formation, List<Participant> explicitParticipants) {
        if (explicitParticipants != null && !explicitParticipants.isEmpty()) {
            return explicitParticipants;
        }
        if (formation == null || formation.getId() == null) {
            return List.of();
        }
        return participantRepository.findByFormationId(formation.getId());
    }
}

