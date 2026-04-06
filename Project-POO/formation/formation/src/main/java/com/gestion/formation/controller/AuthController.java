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

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login ou mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(user.getLogin(), user.getRole().getNom());
        return ResponseEntity.ok(new LoginResponse(token, user.getRole().getNom(), user.getLogin()));
    }

    @PostMapping("/generate-hash")
    public ResponseEntity<?> generateHash(@RequestBody String password) {
        String hash = passwordEncoder.encode(password);
        return ResponseEntity.ok("Hash for '" + password + "': " + hash);
    }

    @GetMapping("/check-admin")
    public ResponseEntity<?> checkAdmin() {
        var user = utilisateurRepository.findByLogin("admin");
        if (user.isPresent()) {
            Utilisateur admin = user.get();
            return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
                put("login", admin.getLogin());
                put("passwordHash", admin.getPassword());
                put("roleId", admin.getRole().getId());
                put("roleName", admin.getRole().getNom());
                put("message", "User admin existe dans la base");
            }});
        }
        return ResponseEntity.status(404).body("Admin not found");
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("❌ No Bearer token found");
        }
        
        String token = authHeader.substring(7);
        System.out.println("🔍 Backend validating token: " + token.substring(0, 50) + "...");
        
        boolean isValid = jwtUtil.validateToken(token);
        System.out.println("✅ Token validation result: " + isValid);
        
        if (isValid) {
            String login = jwtUtil.extractLogin(token);
            String role = jwtUtil.extractRole(token);
            System.out.println("✅ Token valid - Login: " + login + ", Role: " + role);
            
            return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
                put("valid", true);
                put("login", login);
                put("role", role);
                put("message", "✅ Token is VALID");
            }});
        } else {
            System.out.println("❌ Token validation FAILED");
            return ResponseEntity.status(401).body(new java.util.HashMap<String, Object>() {{
                put("valid", false);
                put("message", "❌ Token is INVALID");
            }});
        }
    }
}


