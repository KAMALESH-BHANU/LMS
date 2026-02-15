package org.example.librarymanagementsystem.controller;

import org.example.librarymanagementsystem.dto.RegisterRequest;
import org.example.librarymanagementsystem.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/check")
public class CheckController {

    @PostMapping("/test")
    public ResponseEntity<?> createTest(@RequestBody User u){
        return ResponseEntity.ok(u);
    }
}
