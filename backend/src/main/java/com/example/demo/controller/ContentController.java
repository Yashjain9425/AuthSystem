package com.example.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContentController {

    @GetMapping("/public")
    public String publicContent() {
        return "Public content - anyone can access";
    }

    @GetMapping("/user/content")
    @PreAuthorize("hasRole('USER')")
    public String userContent() {
        return "User content - USER role only";
    }

    @GetMapping("/admin/content")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminContent() {
        return "Admin content - ADMIN role only";
    }
}