package com.gestion.formation.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String login;

    public LoginResponse() {}

    public LoginResponse(String token, String role, String login) {
        this.token = token;
        this.role = role;
        this.login = login;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
}


