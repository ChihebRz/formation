package com.gestion.formation.dto;

public class StatistiqueDTO {
    private String label;
    private Long count;
    private Double totalBudget;

    public StatistiqueDTO() {}

    public StatistiqueDTO(String label, Long count, Double totalBudget) {
        this.label = label;
        this.count = count;
        this.totalBudget = totalBudget;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Long getCount() { return count; }
    public void setCount(Long count) { this.count = count; }

    public Double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(Double totalBudget) { this.totalBudget = totalBudget; }
}


