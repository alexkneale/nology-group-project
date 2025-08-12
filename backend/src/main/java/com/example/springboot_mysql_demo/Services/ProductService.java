package com.example.springboot_mysql_demo.Services;

import com.example.springboot_mysql_demo.Models.Product;
import com.example.springboot_mysql_demo.Models.User;
import com.example.springboot_mysql_demo.Repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }
    // create

    public Product createProduct(Product product) {

        if(!StringUtils.hasText(product.getName()) || !StringUtils.hasText(product.getCategory()) || !StringUtils.hasText(product.getDescription()) || product.getPrice() <= 0 || product.getQuantityInStock() < 0) {
            throw new IllegalArgumentException("Name, category and description of product required, and price must be positive, and quantity greater or equal to 0");
        }

        if(productRepo.existsByName(product.getName())) {
            throw new IllegalArgumentException("Name already in use");
        }
        return productRepo.save(product);
    }

    // read

    // return product by id, if it exists
    public Product getProductById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Product with ID: %d, was not found", id)));
    }
    public List<Product> getAllProducts() {return productRepo.findAll();}

    // update

    public Product updateProduct(Long id,
                                 Product newProduct) {
        Product existingProduct = productRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Product with ID: %d, was not found", id)));

        // check that name, description, category have text, and that price and quantity are positive

        if (StringUtils.hasText(newProduct.getName()) || StringUtils.hasText(newProduct.getDescription()) || StringUtils.hasText(newProduct.getCategory())  || newProduct.getPrice()>0 || newProduct.getQuantityInStock()>=0 ) {
            existingProduct.setName(newProduct.getName());
            existingProduct.setDescription(newProduct.getDescription());
            existingProduct.setCategory(newProduct.getCategory());
            existingProduct.setPrice(newProduct.getPrice());
            existingProduct.setQuantityInStock(newProduct.getQuantityInStock());


        } else {
            throw new IllegalArgumentException("Name, description, category incomplete, or price and quantity non-positive");
        }

        return productRepo.save(existingProduct);
    }

    // delete

    public void deleteProduct(Long id) {
        // check to see user id already exists in database
        Product existingProduct = productRepo.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Product with ID: %d, was not found", id)));

        productRepo.delete(existingProduct);
    }



}
