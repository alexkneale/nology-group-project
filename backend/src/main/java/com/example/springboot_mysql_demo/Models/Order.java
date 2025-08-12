package com.example.springboot_mysql_demo.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double basketTotal;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderedProduct> orderedProducts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBasketTotal() {
        return basketTotal;
    }

    public void calculateBasketTotal() {
        this.basketTotal = orderedProducts.stream()
                .map(op -> op.getPriceAtPurchase() * (Double.valueOf(op.getQuantity())))
                .reduce(0.0, Double::sum);  ;
    }
    // methods to be called whenever Order saved or modified
    @PrePersist
    @PreUpdate
    private void preSave() {
        calculateBasketTotal();
    }

//  function to add products to order and recalculate basket total
//    public void addProduct (OrderedProduct product){
//        product.setOrder(this);
//        this.orderedProducts.add(product);
//        calculateBasketTotal();
//    }

    public List<OrderedProduct> getProductList() {
        return orderedProducts;
    }

    public void setProductList(List<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
