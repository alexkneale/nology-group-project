package com.example.springboot_mysql_demo.Controllers;


import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Services.OrderService;
import org.springframework.http.HttpStatus;
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
// creating an order for a user
    @PostMapping("/user/{userId}")
    public ResponseEntity<Order> createOrder(@PathVariable Long userId) {
    Order order = orderService.createOrder(userId);
    return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

//  delete order
    @DeleteMapping("/{id}")
    public String deleteOrder (@PathVariable Long id){
        orderService.deleteOrder(id);
        return "Order number: "+ id + " deleted.";
    }

    @DeleteMapping
    public String deleteAll (){
        orderService.deleteAll();
        return "All orders deleted";
    }
}
