package com.example.springboot_mysql_demo.Repositories;


import com.example.springboot_mysql_demo.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long > {
}
