package com.example.springboot_mysql_demo.Controllers;


import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    public final OrderService orderService;


    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id){
        return orderService.getOrderByID(id);
    }

    @PostMapping
    public Order createOrder(@RequestParam Long userID){
        return orderService.createOrder(userID);
    }
}
