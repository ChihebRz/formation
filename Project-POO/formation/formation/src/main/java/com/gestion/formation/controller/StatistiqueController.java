package com.gestion.formation.controller;

import com.gestion.formation.service.StatistiqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/statistiques")
public class StatistiqueController {

    @Autowired
    private StatistiqueService statistiqueService;

    @GetMapping
    public Map<String, Object> getStats() {
        return statistiqueService.getStatistiques();
    }
}

