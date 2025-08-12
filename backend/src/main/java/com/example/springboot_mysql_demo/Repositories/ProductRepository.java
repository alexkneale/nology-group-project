package com.example.springboot_mysql_demo.Repositories;
import com.example.springboot_mysql_demo.Models.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    boolean existsByName(String name);
}
