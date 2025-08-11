package com.example.springboot_mysql_demo.Controllers;

import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Tells Spring that this class will handle web requests and return data (not HTML pages).
@RestController
// Sets the base URL path for all methods in this class.
@RequestMapping("/api/users")
public class UserController {

    // have Service within Controller
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Maps HTTP GET requests to a specific method.
    // Maps GET requests for /test (after the base path) to this method.
    // The returned string is sent directly to the HTTP response body because of @RestController.
    @GetMapping("/test")
    public String test() {
        return "IN USERS CONTROLLER";
    }
    // 3. Flow of what happens when you hit /api/users/test
    //Browser sends a GET request to http://localhost:8080/api/users/test.
    //Spring Boot looks for a controller that matches /api/users.
    //Inside that controller, it looks for a method with @GetMapping("/test").
    //It finds your test() method, runs it.
    //The method returns "IN USERS CONTROLLER".
    //Spring Boot sends that string back in the HTTP response.

    // Mapping for HTTP POST requests
    @PostMapping
    // specify @RequestBody, to say that user is coming from
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUser() {
        return userService.getAllUsers();
    }
    // as will have dynamic http depending on
    // user id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

//    @DeleteMapping("/{id}")
//    public String deleteUser(@PathVariable Long id) {
//        return userService.deleteUser(id);
//    }








}
