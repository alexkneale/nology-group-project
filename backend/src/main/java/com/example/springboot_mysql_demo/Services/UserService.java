package com.example.springboot_mysql_demo.Services;


import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Repositories.OrderRepository;
import com.example.springboot_mysql_demo.Repositories.OrderedProductRepository;
import com.example.springboot_mysql_demo.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;


    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }


    //  CREATE
    public User createUser(User user) {
        if (!StringUtils.hasText(user.getName()) ||
                !StringUtils.hasText(user.getEmail())) {
            throw new IllegalArgumentException("Name & email are required.");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already in use: " + user.getEmail());
        }
        if (user.getEmail().indexOf("@") < 1 || user.getEmail().length() < 6) {
            throw new IllegalArgumentException("Please enter a valid email.");
        }
        if (user.getName().length() > 50){
            throw new IllegalArgumentException("Please enter a valid name below 50 characters.");
        }

        return userRepo.save(user);
    }


// READ

    public User getUserById(Long id) {
        return userRepo.findById(id).
                orElseThrow(()-> new EntityNotFoundException(
                        "User with ID: " + id + " not found."
                ));
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserByEmail(String email){
        return userRepo.findByEmail(email);
    }

//  UPDATE

    public User updateUser(Long id, User newUser){
        User existingUser = userRepo.findById(id).
                orElseThrow(()-> new EntityNotFoundException(
                        "User with ID: " + id + " not found."
                ));
        if (StringUtils.hasText(newUser.getName())){
        existingUser.setName(newUser.getName());}

        if (StringUtils.hasText(newUser.getEmail())){
            if (userRepo.existsByEmail(newUser.getEmail())){
                throw new IllegalArgumentException("Email is already in use: "+ newUser.getEmail());
            }
            if (existingUser.getEmail().equals(newUser.getEmail())){
                throw new IllegalArgumentException("New email matches existing email for user.");
            }
            existingUser.setEmail(newUser.getEmail());
        }
        return userRepo.save(existingUser);
    }


//  DELETE

    public void deleteUser (Long id){
        userRepo.delete(userRepo.findById(id).orElseThrow(()->
                new EntityNotFoundException("User with ID: \" + id\n" +
                        "                    + \" was not found and therefore could not be deleted")));
    }
}











