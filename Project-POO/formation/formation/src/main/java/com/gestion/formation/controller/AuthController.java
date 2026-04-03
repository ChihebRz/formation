package com.gestion.formation.controller;

import com.gestion.formation.dto.*;
import com.gestion.formation.entity.Utilisateur;
import com.gestion.formation.repository.UtilisateurRepository;
import com.gestion.formation.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Utilisateur user = utilisateurRepository.findByLogin(request.getLogin())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login ou mot de passe incorrect");
        }

        // DEBUG: Accepter n'importe quel password pour tester
        String token = jwtUtil.generateToken(user.getLogin(), user.getRole().getNom());
        return ResponseEntity.ok(new LoginResponse(token, user.getRole().getNom(), user.getLogin()));
    }
}


