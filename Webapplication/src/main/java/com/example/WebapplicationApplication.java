package com.example;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

import jakarta.servlet.annotation.WebServlet;

@SpringBootApplication
public class WebapplicationApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebapplicationApplication.class, args);
	}
	

}
