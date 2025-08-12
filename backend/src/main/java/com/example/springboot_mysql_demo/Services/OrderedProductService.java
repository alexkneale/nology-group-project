package com.example.springboot_mysql_demo.Services;


import com.example.springboot_mysql_demo.Repositories.OrderRepository;
import com.example.springboot_mysql_demo.Repositories.OrderedProductRepository;
import com.example.springboot_mysql_demo.Repositories.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderedProductService {
    private final OrderedProductRepository orderedProductRepo;
    private final ProductRepository productRepo;
    private OrderRepository orderRepo;


    public OrderedProductService(OrderedProductRepository orderedProductRepo,
                                 ProductRepository productRepo, OrderRepository orderRepo) {
        this.orderedProductRepo = orderedProductRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }




}
