package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Product;
import com.example.service.ProductService;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
public class ProductController {
	
	@Autowired
	public ProductService productService;
	
	@GetMapping("/products")
	public List<Product> getProducts(){
		System.out.println("Inside product controller");
		return productService.getAllProduct();
	}
	
	@GetMapping("/products/{prodId}")
	public  Product getProductById(@PathVariable int  prodId)
	{
		return productService.getProductById(prodId);
	}
	
	@PostMapping("/products")
	public void addProducts(@RequestBody Product product){
		productService.addProducts(product);
	};
	
	@PutMapping("/products")
	public void updateProduct (@RequestBody Product prod)
	
	{
		productService.updateProduct(prod);
	}
	
	@DeleteMapping("/products/{prodId}")
	public void deleteProduct (@PathVariable int prodId)
	
	{
		productService.deleteProduct(prodId);
	}

}
