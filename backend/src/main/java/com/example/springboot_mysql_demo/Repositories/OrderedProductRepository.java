package com.example.springboot_mysql_demo.Repositories;

import com.example.springboot_mysql_demo.Models.OrderedProduct;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderedProductRepository extends JpaRepository <OrderedProduct, Long> {
}
