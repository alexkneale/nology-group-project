package com.example.springboot_mysql_demo.Services;

import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Models.OrderedProduct;
import com.example.springboot_mysql_demo.Models.Product;
import com.example.springboot_mysql_demo.Repositories.OrderRepository;
import com.example.springboot_mysql_demo.Repositories.OrderedProductRepository;
import com.example.springboot_mysql_demo.Repositories.ProductRepository;
import com.example.springboot_mysql_demo.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderedProductService {
    private final OrderedProductRepository orderedProductRepo;
    private final ProductRepository productRepo;
    private OrderRepository orderRepo;


    public OrderedProductService(OrderedProductRepository orderedProductRepo,
                                 ProductRepository productRepo, OrderRepository orderRepo, UserRepository userRepo) {
        this.orderedProductRepo = orderedProductRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    // Create

    public OrderedProduct createOrderedProduct(Long orderId, Long productId, int quantity) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new EntityNotFoundException(String.format("Order with ID: %d, was not found", orderId)));
        Product product = productRepo.findById(productId).orElseThrow(() -> new EntityNotFoundException(String.format("Product with ID: %d, was not found", productId)));

        OrderedProduct newOrderedProduct = new OrderedProduct();
        newOrderedProduct.setOrder(order);
        newOrderedProduct.setProduct(product);
        newOrderedProduct.setQuantity(quantity);
        newOrderedProduct.setPriceAtPurchase(product.getPrice());
        return orderedProductRepo.save(newOrderedProduct);
    }

    // Read

    public OrderedProduct getOrderedProductById(Long id) {return orderedProductRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Product with ID: %d, was not found", id)));}

    public List<OrderedProduct> getAllOrderedProducts() {
        return orderedProductRepo.findAll();
    }

    // update
    // how would updating in theory work here?
    // update orders and orderedproducts independently?
    public void updateQuantity(Long id, int newQuantity) {
        OrderedProduct existingOrderedProduct = orderedProductRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Ordered Product with ID: %d, was not found", id)));
        if (newQuantity > 0) {
            existingOrderedProduct.setQuantity(newQuantity);
            // save changes
            orderedProductRepo.save(existingOrderedProduct);
        } else if (newQuantity == 0) {
            deleteOrderedProduct(id);
        } else {
            throw new IllegalArgumentException("Cannot have negative quantities");
        }
    }

    // delete
    public void deleteOrderedProduct (Long id){
        OrderedProduct existingOrderedProduct = orderedProductRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Ordered Product with ID: %d, was not found", id)));
        orderedProductRepo.delete(existingOrderedProduct);

    }
}
