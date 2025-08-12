package com.example.springboot_mysql_demo.Controllers;
import com.example.springboot_mysql_demo.Models.Product;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Tells Spring that this class will handle web requests and return data (not HTML pages).
@RestController
// Sets the base URL path for all methods in this class.
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // gets
    @GetMapping("/test")
    public String test() {
        return "IN PRODUCT CONTROLLER";
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    // as will have dynamic http depending on
    // user id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // creating product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }
}
