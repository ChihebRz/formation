package com.gestion.formation.controller;

import com.gestion.formation.dto.PlanningDTO;
import com.gestion.formation.service.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/planning")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanningController {

    @Autowired
    private PlanningService planningService;

    /**
     * Créer un nouveau planning avec vérification des conflits
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE')")
    public ResponseEntity<?> createPlanning(@RequestBody PlanningDTO planningDTO) {
        try {
            PlanningDTO createdPlanning = planningService.createPlanning(planningDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPlanning);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur de validation",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", "Erreur serveur",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Récupérer tous les plannings
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE', 'SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<PlanningDTO>> getAllPlannings() {
        List<PlanningDTO> plannings = planningService.getAllPlannings();
        return ResponseEntity.ok(plannings);
    }

    /**
     * Récupérer un planning par ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE', 'SIMPLE_UTILISATEUR')")
    public ResponseEntity<?> getPlanningById(@PathVariable Long id) {
        try {
            PlanningDTO planning = planningService.getPlanningById(id);
            return ResponseEntity.ok(planning);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", "Planning non trouvé",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Récupérer les plannings d'une formation
     */
    @GetMapping("/formation/{formationId}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE', 'SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<PlanningDTO>> getPlanningsByFormation(@PathVariable Long formationId) {
        List<PlanningDTO> plannings = planningService.getPlanningsByFormation(formationId);
        return ResponseEntity.ok(plannings);
    }

    /**
     * Récupérer les plannings d'un formateur
     */
    @GetMapping("/formateur/{formateurId}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE', 'SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<PlanningDTO>> getPlanningsByFormateur(@PathVariable Long formateurId) {
        List<PlanningDTO> plannings = planningService.getPlanningsByFormateur(formateurId);
        return ResponseEntity.ok(plannings);
    }

    /**
     * Mettre à jour un planning
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE')")
    public ResponseEntity<?> updatePlanning(@PathVariable Long id, @RequestBody PlanningDTO planningDTO) {
        try {
            PlanningDTO updatedPlanning = planningService.updatePlanning(id, planningDTO);
            return ResponseEntity.ok(updatedPlanning);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur de validation",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", "Erreur serveur",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Supprimer un planning
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<?> deletePlanning(@PathVariable Long id) {
        try {
            planningService.deletePlanning(id);
            return ResponseEntity.ok(Map.of("message", "Planning supprimé avec succès"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", "Planning non trouvé",
                "message", e.getMessage()
            ));
        }
    }

    /**
     * Changer le statut d'un planning
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR', 'RESPONSABLE')")
    public ResponseEntity<?> updatePlanningStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String newStatus = request.get("status");
            PlanningDTO updatedPlanning = planningService.updatePlanningStatus(id, newStatus);
            return ResponseEntity.ok(updatedPlanning);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", "Erreur serveur",
                "message", e.getMessage()
            ));
        }
    }
}



