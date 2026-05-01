package com.preethi.usermanagement.repository;

import com.preethi.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByNameContainingIgnoreCase(String name);
}