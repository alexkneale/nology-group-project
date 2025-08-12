package com.example.springboot_mysql_demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
// Representational State Transfer
// RESTful API --> have GET/ POST/ PUT/ DELETE/ PATCH
// /GET /api/customers -> returns all the customers
@RestController
public class PingPong {
    // do get request and return Welcome
    // endpoint specified in () below
    // here endpoint is main page: /
    @GetMapping("/")
    public String homePage() {return "Welcome";}
    // now we do same for /ping site
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
