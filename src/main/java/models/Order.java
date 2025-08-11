package models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

    @Entity(name = "Orders")
    public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long basketTotal;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<Product> productList;


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
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public List<Integer> getQuantityList() {
            return quantityList;
        }

     public void setQuantityList(List<Integer> quantityList) {
            this.quantityList = quantityList;
        }

    private List<Integer> quantityList;
}
