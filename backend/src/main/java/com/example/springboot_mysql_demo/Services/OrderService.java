package com.example.springboot_mysql_demo.Services;


import com.example.springboot_mysql_demo.Models.Order;
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


    public Order createOrder (Order order){
//      validations
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
        return orderRepo.save(existingOrder);
    }

    public void deleteOrder (Long id){
//        validations
        orderRepo.deleteById(id);
    }


}
