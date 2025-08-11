package com.example.springboot_mysql_demo.repositories;

import com.example.springboot_mysql_demo.Models.Movie;
import com.example.springboot_mysql_demo.Models.Rating;
import com.example.springboot_mysql_demo.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // JPA repository
}