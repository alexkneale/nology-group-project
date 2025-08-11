package com.example.springboot_mysql_demo.repositories;

import com.example.springboot_mysql_demo.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// in JpaRepository, set <Type of User, Id type>

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JPA repository

    // Method that returns a boolean when a user email exists in DB
    boolean existsByEmail(String email);
    // Spring boot will implement this interface and abstract method under the hood
    // then convert it into a SQL query
    // we can do this, as under the hood, there is parsing
    // existsBy gives info to spring to tell them what type of method should be implemented from interfface


}
