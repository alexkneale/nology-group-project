package com.example.springboot_mysql_demo.repositories;

import com.example.springboot_mysql_demo.Models.Movie;
import com.example.springboot_mysql_demo.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // JPA repository

}