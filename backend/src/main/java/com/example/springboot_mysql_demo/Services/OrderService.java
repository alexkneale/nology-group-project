package com.example.springboot_mysql_demo.Services;


import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Models.OrderedProduct;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Repositories.OrderRepository;
import com.example.springboot_mysql_demo.Repositories.OrderedProductRepository;
import com.example.springboot_mysql_demo.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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
        order.setUser(user);
        order.setProductList(List.of());
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
                && Objects.equals(newOrder.getBasketTotal(), existingOrder.getBasketTotal())){
            throw new IllegalArgumentException("New order is equal to existing order");
        }
        existingOrder.setProductList(newOrder.getProductList());
        existingOrder.calculateBasketTotal();
        return orderRepo.save(existingOrder);
    }


//    public Order addProductToOrder (Long orderId, OrderedProduct product){
//        Order order = orderRepo.findById(orderId).
//                orElseThrow(()->
//                        new EntityNotFoundException("Order with ID: "+ orderId+" not found. Cannot add product to order"));
//        order.addProduct(product);
//        return orderRepo.save(order);
//    }


    public void deleteOrder (Long id){
    if (!orderRepo.existsById(id)){
        throw new EntityNotFoundException(
                "Order with ID: " + id + " was not found and therefore could not be deleted.");
    }
        orderRepo.deleteById(id);
    }


}
