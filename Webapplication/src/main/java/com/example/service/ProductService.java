package com.example.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Product;
import com.example.repository.ProductRepo;

@Service
public class ProductService {

	
	@Autowired
	public ProductRepo productrepo;
	
	public List<Product> getAllProduct(){
		return productrepo.findAll();
		
	}
	
	public void addProducts(Product product){
		productrepo.save(product);
	
	}

	public Product getProductById(int prodId) {
		return productrepo.findById(prodId).orElse(new Product());
	
	
	}

	public void updateProduct(Product prod) {
		productrepo.save(prod);
	}
	
	public void deleteProduct(int  prodId) {
		productrepo.deleteById(prodId);
	}

}
