package com.preethi.usermanagement.service;


import com.preethi.usermanagement.model.User;
import com.preethi.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public List<User> getAllUsers(String name) {
        if (name != null && !name.isEmpty()) {
            return repo.findByNameContainingIgnoreCase(name);
        }
        return repo.findAll();
    }

    public User getUserById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void addUser(User user) {
        repo.save(user);
    }

    public void updateUser(int id, User user){
        if(!repo.existsById(id)){
            throw new RuntimeException("User not found with id: " + id);
        }
        user.setId(id);
        repo.save(user);
    }

    public void deleteUserById(int id){
        if(!repo.existsById(id)){
            throw new RuntimeException("User not found with id: " + id);
        }
        repo.deleteById(id);
    }

}
