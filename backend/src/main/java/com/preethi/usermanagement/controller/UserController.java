package com.preethi.usermanagement.controller;


import com.preethi.usermanagement.model.User;
import com.preethi.usermanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {


    private final UserService service;
    public UserController(UserService service){
        this.service = service;
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(required = false) String name) {
        return ResponseEntity.ok(service.getAllUsers(name));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id){
        return ResponseEntity.ok(service.getUserById(id));
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@Valid @RequestBody User user){
        service.addUser(user);
        return ResponseEntity.status(201).body("User created successfully");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @Valid @RequestBody User user){
        service.updateUser(id, user);
        return ResponseEntity.ok("User updated successfully");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        service.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }




}
