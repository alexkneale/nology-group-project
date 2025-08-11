package com.example.springboot_mysql_demo.Models;

import jakarta.persistence.*;

@Entity(name = "Ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private int score;

    // Rating -> User
    // join column below specifies that rating can be accessed from user
    // specified by id of user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Rating -> Movie = one movie can have many ratings
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
