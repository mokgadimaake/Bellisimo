package com.bellisimo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bellisimo.model.Commodity;

@Repository
public class CommodityRepository {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public Commodity findById(long id) {

		String sql = "SELECT * FROM commodity WHERE ID = ?";

		Commodity commodity = null;
		try {
			commodity = (Commodity)jdbcTemplate.queryForObject(
					sql, new Object[] { id },
					new BeanPropertyRowMapper<Commodity>(Commodity.class));
		} catch (DataAccessException e) {
			return commodity;
		}

		return commodity;
	}
	
	// Find all commodities, thanks Java 8, you can create a custom RowMapper like this :
    public List<Commodity> findAll() {

        List<Commodity> result = jdbcTemplate.query(
                "SELECT id, name, department, type, price FROM commodity",
                (rs, rowNum) -> new Commodity(rs.getLong("id"), rs.getString("name"), rs.getString("department"), rs.getString("type"), rs.getLong("price"))
        );

        return result;
    }
    
    
    @Transactional
	public int save(Commodity c) {
		String inserCommodity = "INSERT INTO COMMODITY (name, department, type, price) VALUES(?,?,?,?)";	
		return jdbcTemplate.update(inserCommodity, c.getName(), c.getDepartment(), c.getType(), c.getPrice());
	}

    @Transactional
   	public int update(Commodity c) {
   		String inserCommodity = "UPDATE COMMODITY SET type=?, price=? WHERE name=?";	
   		return jdbcTemplate.update(inserCommodity, c.getType(), c.getPrice(), c.getName());
   	}
    
    @Transactional
   	public int delete(Commodity c) {
   		String inserCommodity = "DELETE FROM COMMODITY WHERE name=?";	
   		return jdbcTemplate.update(inserCommodity, c.getName());
   	}
}
