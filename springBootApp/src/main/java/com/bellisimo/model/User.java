package com.bellisimo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="user")
public class User implements Serializable
{
	private static final long serialVersionUID = -3009157732242241606L;
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name ="surname")
	private String surname;
	
	@Column(name ="username")
	private String username;
	
	@Column(name ="password")
	private String password;
	
	@Column(name= "role")
	private String role;
	
	@Transient
	private boolean loggedIn;
	
	@Transient
	private String loggedInMessage;
	
	
	protected User() {}
	
	public User(long id, String name, String surname, String password, String username, String role) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public long getId()
	{
		return id;	
	}
	public void setId(long id)
	{
		this.id = id;
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	
	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}

	public String getLoggedInMessage() {
		return loggedInMessage;
	}

	public void setLoggedInMessage(String loggedInMessage) {
		this.loggedInMessage = loggedInMessage;
	}

	@Override
	public String toString() {
		return String.format("User[id=%d, name='%s', surname='%s',username='%s', role='%s' ]", id, name, surname, username, role);
	}

}

