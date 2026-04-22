package com.gestion.formation.service;

import com.gestion.formation.entity.Participant;
import com.gestion.formation.entity.Planning;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PlanningEmailNotificationService {

    private static final Logger log = LoggerFactory.getLogger(PlanningEmailNotificationService.class);

    private final JavaMailSender mailSender;

    @Value("${app.notifications.email.enabled:false}")
    private boolean emailNotificationsEnabled;

    @Value("${app.notifications.email.from:no-reply@excellent-training.local}")
    private String senderAddress;

    public PlanningEmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void notifyParticipants(Planning planning, boolean updateEvent) {
        List<Participant> participants = planning == null ? null : planning.getParticipants();
        notifyParticipants(planning, participants, updateEvent);
    }

    public void notifyParticipants(Planning planning, List<Participant> recipients, boolean updateEvent) {
        if (!emailNotificationsEnabled || planning == null) {
            return;
        }

        List<Participant> participants = recipients;
        if ((participants == null || participants.isEmpty()) && planning.getFormation() != null) {
            participants = planning.getFormation().getParticipants();
        }
        if (participants == null || participants.isEmpty()) {
            log.warn("Aucun participant trouve pour le planning {}", planning.getId());
            return;
        }

        Set<String> targetEmails = participants.stream()
            .map(Participant::getEmail)
            .filter(Objects::nonNull)
            .map(String::trim)
            .filter(email -> !email.isEmpty())
            .collect(Collectors.toSet());

        if (targetEmails.isEmpty()) {
            log.warn("Aucun email valide trouve pour le planning {}", planning.getId());
            return;
        }

        log.info("Envoi email planning {} vers {} destinataire(s)", planning.getId(), targetEmails.size());

        String subject = updateEvent
            ? "Mise a jour de votre planning de formation"
            : "Nouvelle affectation a une formation";

        String formateurNom = planning.getFormateur() == null
            ? "Non defini"
            : planning.getFormateur().getNom() + " " + planning.getFormateur().getPrenom();

        String body = String.format(
            "Bonjour,%n%n" +
                "Vous etes affecte(e) a la formation: %s%n" +
                "Date debut: %s%n" +
                "Date fin: %s%n" +
                "Lieu: %s%n" +
                "Formateur: %s%n%n" +
                "Merci.%n" +
                "Excellent Training",
            planning.getFormation() != null ? planning.getFormation().getTitre() : "Non definie",
            planning.getDateDebut(),
            planning.getDateFin(),
            planning.getLieu() != null ? planning.getLieu() : "Non defini",
            formateurNom
        );

        for (String email : targetEmails) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(senderAddress);
                message.setTo(email);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                log.info("Email de planning envoye a {}", email);
            } catch (Exception ex) {
                // Non-bloquant: la creation/modification du planning reste valide meme si l'envoi email echoue.
                log.warn("Echec envoi email planning a {}: {}", email, ex.getMessage());
            }
        }
    }
}



