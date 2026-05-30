package com.example.demo.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class AuthException extends RuntimeException {

    private final HttpStatus status;

    public AuthException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
