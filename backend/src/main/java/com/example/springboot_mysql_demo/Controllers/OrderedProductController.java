package com.example.springboot_mysql_demo.Controllers;
import com.example.springboot_mysql_demo.Models.Order;
import com.example.springboot_mysql_demo.Models.OrderedProduct;
import com.example.springboot_mysql_demo.Models.Product;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Services.OrderedProductService;
import com.example.springboot_mysql_demo.Services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// Tells Spring that this class will handle web requests and return data (not HTML pages).
@RestController
@RequestMapping("/api/ordered-products")
public class OrderedProductController {
    public final OrderedProductService orderedProductService;

    public OrderedProductController(OrderedProductService orderedProductService) {
        this.orderedProductService = orderedProductService;
    }



    // Create

    @PostMapping()
    public ResponseEntity<OrderedProduct> createOrderedProduct(@RequestParam Long orderId,
                                               @RequestParam Long productId,
                                               @RequestParam int quantity) {
        OrderedProduct orderedProduct = orderedProductService.createOrderedProduct(orderId,  productId,  quantity);
        return new ResponseEntity<>(orderedProduct,HttpStatus.CREATED);
    }


    // Read
    @GetMapping("/{id}")
    public OrderedProduct getOrderedProductById(@PathVariable Long id) {
        return orderedProductService.getOrderedProductById(id);
    }

    @GetMapping
    public List<OrderedProduct> getAllOrderedProducts() {
        return orderedProductService.getAllOrderedProducts();
    }

    // Update

    @PatchMapping("/{id}")
    public OrderedProduct updateQuantity(
            @PathVariable Long id,
            @RequestParam int newQuantity
    ) {
        orderedProductService.updateQuantity(id, newQuantity);
        return orderedProductService.getOrderedProductById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteOrderedProduct(@PathVariable Long id) {
        orderedProductService.deleteOrderedProduct(id);
    }
    // Delete all function

    @DeleteMapping
    public void deleteAllOrderedProducts() {
        orderedProductService.deleteAllOrderedProducts();
    }


}
