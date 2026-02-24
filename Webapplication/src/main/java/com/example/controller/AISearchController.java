package com.example.controller;

import com.example.entity.Product;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/search")
public class AISearchController {
//
    @Autowired
    private ProductService productService;
@GetMapping("/ai")
public List<Product> aiSearch(@RequestParam String query) {
    List<Product> allProducts = productService.getAllProduct();


    // Convert products to readable text for Ollama
    String productList = allProducts.stream()
        .map(p -> "prodId:" + p.getProdId() + 
                  " name:" + p.getProdName() + 
                  " brand:" + p.getBrand() + 
                  " category:" + p.getCategory() + 
                  " price:" + p.getPrice() + 
                  " available:" + p.isAvailable())
        .collect(Collectors.joining("\n"));

    System.out.println("PRODUCT LIST SENT TO AI:\n" + productList); // debug

    String prompt = "From this product list:\n" + productList +
        "\n\nFind products matching: '" + query + "'" +
        "\nReply with ONLY the matching prodId numbers separated by commas." +
        "\nExample: 2,5,8" +
        "\nIf none match reply with: NONE" +
        "\nDo not write code. Do not explain. Just the numbers.";

    // Call Ollama REST API directly
    RestTemplate restTemplate = new RestTemplate();
    
    Map<String, Object> requestBody = Map.of(
    	    "model", "llama3.2", 
    	    "prompt", prompt,
    	    "stream", false
    	);

    Map response = restTemplate.postForObject(
        "http://localhost:11434/api/generate",
        requestBody,
        Map.class
    );

    String aiResponse = response.get("response").toString().trim();
    System.out.println("AI RAW RESPONSE: " + aiResponse);

    if (aiResponse.equals("NONE") || aiResponse.isBlank()) {
        return List.of();
    }

    List<Integer> matchedIds = Arrays.stream(aiResponse.split(","))
        .map(String::trim)
        .filter(s -> s.matches("\\d+"))
        .map(Integer::parseInt)
        .toList();

    return allProducts.stream()
        .filter(p -> matchedIds.contains(p.getProdId()))
        .toList();
    
    
}
}