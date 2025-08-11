package com.example.springboot_mysql_demo.Services;

import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.proxy.EntityNotFoundDelegate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService {
    // dependency injection
    // to give service (UserService) access to repo (UserRepository)
    // have instance of repo in service
    // a lot happens under the hood here
    private final UserRepository userRepo;

    public UserService(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    // CREATE
    public User createUser(User user) {
        //// first do validation checks
        // check username has text, or email has text
        if(!StringUtils.hasText(user.getName()) || !StringUtils.hasText(user.getEmail())) {
            throw new IllegalArgumentException("Name is required");
        }
        // check email doesn't already exist in repo
        if(userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }


        // save to repo, using .save method, on Repository
        return userRepo.save(user);
    }

    // READ
    // number of methods
    public User getUserById(Long id) {
        // need or else throw, as return type of findBy method is
        // optional User, as may not have id in our table
        return userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("User with ID: %d, was not found", id)));

    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    // UPDATE --> Patch (Partial) - Put (complete ie erase if exists or create if it does not exist)
    public User updateUser(Long id, User newUser) {
        // check to see user id already exists in database
        User existing = userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("User with ID: %d, was not found", id)));
        // check that user has text
        if (StringUtils.hasText(newUser.getName())) {
            existing.setName(newUser.getName());
        }

        // check that email
        if (StringUtils.hasText(newUser.getEmail())) {
            if(existing.getEmail().equals(newUser.getEmail()) && userRepo.existsByEmail(newUser.getEmail())) {
                throw new IllegalArgumentException("Email already in use");
            };
            existing.setEmail(newUser.getEmail());
        }

        return userRepo.save(existing);
    }

    // DELETE
    public void deleteUser(Long id) {
    }
}
