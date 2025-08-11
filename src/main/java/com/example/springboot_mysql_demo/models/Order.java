package com.example.springboot_mysql_demo.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

    @Entity(name = "Orders")
    public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long basketTotal;
    private List<Integer> quantityList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToMany
    @JoinTable(
            name = "ordered_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBasketTotal() {
        return basketTotal;
    }

    public void setBasketTotal(Long basketTotal) {
        this.basketTotal = basketTotal;
    }

    public List<Product> getProductList() {
        return products;
    }

    public void setProductList(List<Product> productList) {
        this.products = productList;
    }

    public List<Integer> getQuantityList() {
            return quantityList;
        }

     public void setQuantityList(List<Integer> quantityList) {
            this.quantityList = quantityList;
        }


}
