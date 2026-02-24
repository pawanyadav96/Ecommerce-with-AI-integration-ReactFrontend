package com.example.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import tools.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

//@Data
//@AllArgsConstructor
@Entity
public class Product {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int prodId;
	private String prodName;
	private BigDecimal price;
	private String description;
	private String category;
	private String brand;
//	@JsonFormat(shape =JsonFormat.Shape.STRING , pattern = "dd--mm--yyyy")
	private Date releasedate;
	private int quantity;
	private boolean available;
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	
	public int getProdId() {
		return prodId;
	}
	public void setProdId(int prodId) {
		this.prodId = prodId;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public String getDesc() {
		return description;
	}
	public void setDesc(String desc) {
		this.description = desc;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public Date getReleasedate() {
		return releasedate;
	}
	public void setReleasedate(Date releasedate) {
		this.releasedate = releasedate;
	}
	public Product(int prodId, String prodName, BigDecimal price, String desc, String category, String brand,
			Date releasedate, int quantity, boolean available) {
		super();
		this.prodId = prodId;
		this.prodName = prodName;
		this.price = price;
		this.description = desc;
		this.category = category;
		this.brand = brand;
		this.releasedate = releasedate;
		this.quantity = quantity;
		this.available = available;
	}
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}


	
	
}
