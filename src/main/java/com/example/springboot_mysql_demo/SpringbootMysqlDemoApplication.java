package com.example.springboot_mysql_demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootMysqlDemoApplication {

	public static void main(String[] args) {
		// this calls all methods (here PingPong class instance method HomePage) for us
		// a lot happening under the hood
		SpringApplication.run(SpringbootMysqlDemoApplication.class, args);

		// Layers of a springboot app
		// - Models - class representing each of our entitites which can be mapped to DB storage (SQL table)
		// - Repositories - data access layer --> what talks with database directly - JPA repository has
		// preset CRUD method to allow direct I/O operations on DB
		// - Controllers - Handling HTTP requests - orchestrating the operations (talking to services, getting data back from services, sending responses to the clients)
		// - Services - tecnhically, this layer is not 100% mandatory - but very useful for keeping business logic (even though sometimes we handle this in Controllers)
		// data processing, cleaning, validation etc... (services talk to repos)

		// HTTP request/response from Client -> Controllers (http requests) --> services -> Repos -> Database

		// We want to build an API for Users to give Movies ratings
		// One User can rate multiple Movies
		// One Movie can have multiple Ratings
		// A Rating is specific to a User and to a Movie


	}

}
