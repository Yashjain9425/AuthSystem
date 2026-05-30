package com.example.demo.dto;

import com.example.demo.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;

    private String name;

    private String email;

    private Role role;
}
