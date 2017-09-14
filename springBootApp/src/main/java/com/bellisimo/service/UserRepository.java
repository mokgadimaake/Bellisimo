package com.bellisimo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bellisimo.model.User;

@Repository
public class UserRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public User findById(long id) {

		String sql = "SELECT * FROM USER_PROFILE WHERE ID = ?";

		User user = null;
		try {
			user = (User)jdbcTemplate.queryForObject(
					sql, new Object[] { id },
					new BeanPropertyRowMapper<User>(User.class));
		} catch (DataAccessException e) {
			return user;
		}

		return user;
	}
	
	public boolean userExists(String username) {
		User user = findByUsername(username);
		if(user != null && user.getId() > 0)
			return true;
		else
			return false;
	}

	public User findByUsername(String username) {

		User user = null;
		try {
			String sql = "SELECT * FROM USER_PROFILE WHERE USERNAME = ?";

			user = (User)jdbcTemplate.queryForObject(
					sql, new Object[] { username },
					new BeanPropertyRowMapper<User>(User.class));
		} catch (DataAccessException e) {
			return user;
		}

		return user;
	}

	// Find all users
	public List<User> findAll() {

		List<User> result = jdbcTemplate.query(
				"SELECT id, name, surname, username, password, role FROM user_profile",
				(rs, rowNum) -> new User(rs.getLong("id"), rs.getString("name"), rs.getString("surname"), rs.getString("username"), rs.getString("password"), rs.getString("role"))
				);

		return result;
	}

	@Transactional
	public int save(User u) {
		String inserUser = "INSERT INTO USER (name, surname, username, password, role) VALUES(?,?,?,?,?)";	
		return jdbcTemplate.update(inserUser, u.getName(), u.getSurname(), u.getUsername(), u.getPassword(), u.getRole());
	}


}
