package com.example.springboot_mysql_demo.Services;


import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Repositories.OrderRepository;
import com.example.springboot_mysql_demo.Repositories.OrderedProductRepository;
import com.example.springboot_mysql_demo.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final OrderedProductRepository orderedProductRepo;
    private final UserRepository userRepo;


    public OrderService(OrderRepository orderRepo, OrderedProductRepository orderedProductRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.orderedProductRepo = orderedProductRepo;
        this.userRepo = userRepo;
    }


    public Order createOrder (Long userID) {
        Order order = new Order();
        User user = userRepo.findById(userID).
                orElseThrow(() -> new EntityNotFoundException(
                "User with ID: " + userID + " not found, could not create order."));
        if (order.getBasketTotal() > 0) {
            throw new IllegalArgumentException("Basket total cannot be a negative number.");
        }
        if (!userRepo.existsById(order.getUser().getId())){
            throw new IllegalArgumentException("Could not create order as user ID not found");
        }
        order.setUser(user);
        return orderRepo.save(order);
    }

    public Order getOrderByID (Long id){
        return orderRepo.findById(id).orElseThrow(()->
               new EntityNotFoundException("Order not found for id: "+id));
    }

    public List<Order> getAllOrders (){
        return orderRepo.findAll();
    }

    public Order updateOrder (Order newOrder, Long id){
//       validations here
        Order existingOrder = orderRepo.findById(id).
                orElseThrow(()->
                        new EntityNotFoundException("Order not found for id: "+id));
        if (newOrder.getProductList() == existingOrder.getProductList()
                && newOrder.getBasketTotal() == existingOrder.getBasketTotal()){
            throw new IllegalArgumentException("New order is equal to existing order");
        }
        return orderRepo.save(existingOrder);
    }

    public void deleteOrder (Long id){
    if (!orderRepo.existsById(id)){
        throw new EntityNotFoundException(
                "Order with ID: " + id + " was not found and therefore could not be deleted.");
    }
        orderRepo.deleteById(id);
    }


}
