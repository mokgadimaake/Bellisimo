package com.bellisimo.model;

import java.io.File;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="commodity")
public class Commodity {
	
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="department")
	private String department;
	
	@Column(name="type")
	private String type;
	
	@Column(name="price")
	private long price;
	
	@Column(name="special_price")
	private long specialPrice;

	
	@Column(name="special_start_period")
	private Date specialStartPeriod;
	
	@Column(name="special_end_period")
	private Date specialEndPeriod;
	
	@Column(name="image")
	private File image;
	
	private String specialPriceDescription;

	protected Commodity() {}
	
	public Commodity(long id, String name, String department, String type, long price) {
		super();
		this.id = id;
		this.name = name;
		this.department = department;
		this.type = type;
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public long getSpecialPrice() {
		return specialPrice;
	}

	public void setSpecialPrice(long specialPrice) {
		this.specialPrice = specialPrice;
	}

	public Date getSpecialStartPeriod() {
		return specialStartPeriod;
	}

	public void setSpecialStartPeriod(Date specialStartPeriod) {
		this.specialStartPeriod = specialStartPeriod;
	}

	public Date getSpecialEndPeriod() {
		return specialEndPeriod;
	}

	public void setSpecialEndPeriod(Date specialEndPeriod) {
		this.specialEndPeriod = specialEndPeriod;
	}

	public String getSpecialPriceDescription() {
		if(specialPrice == 0)
			return "NONE";
		return String.valueOf(specialPrice);
	}

	public void setSpecialPriceDescription(String specialPriceDescription) {
		this.specialPriceDescription = specialPriceDescription;
	}

	public File getImage() {
		return image;
	}

	public void setImage(File image) {
		this.image = image;
	}
	
}
