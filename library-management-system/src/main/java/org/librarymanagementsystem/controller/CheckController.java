package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.model.User;
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
