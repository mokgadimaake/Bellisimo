package com.bellisimo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.bellisimo.generic.GeneralConstants;
import com.bellisimo.model.Commodity;
import com.bellisimo.model.User;

@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
@RestController
public class MainController {
	
	@Autowired
	private CommodityRepository commodityRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	//-------------------Retrieve Single Commodity--------------------------------------------------------
    @RequestMapping(value = "/commodity/view", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
   public @ResponseBody ResponseEntity<Commodity> getCommodity(@RequestParam("id") long id) {
       System.out.println("fetching commodity with id " + id);
       Commodity commodity = commodityRepository.findById(id);
       if (commodity == null) {
           System.out.println("commodity with id " + id + " not found");
           return new ResponseEntity<Commodity>(HttpStatus.NOT_FOUND);
       }
       return new ResponseEntity<Commodity>(commodity, HttpStatus.OK);
   }

    
    
   //-------------------Create a Commodity--------------------------------------------------------
   @RequestMapping(value = "/commodity/create", method = RequestMethod.POST)
   public @ResponseBody ResponseEntity<Void> createCommodity(@RequestBody Commodity commodity, UriComponentsBuilder ucBuilder) {
       
	   commodityRepository.save(commodity);

       HttpHeaders headers = new HttpHeaders();
       headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(commodity.getId()).toUri());
       return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
   }
   
   @RequestMapping(value = "/commodity/update", method = RequestMethod.POST)
   public @ResponseBody ResponseEntity<Void> updateCommodity(@RequestBody Commodity commodity, UriComponentsBuilder ucBuilder) {
       
	   commodityRepository.update(commodity);

       HttpHeaders headers = new HttpHeaders();
       headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(commodity.getId()).toUri());
       return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
   }
   
   
   @RequestMapping(value = "/commodity/delete", method = RequestMethod.POST)
   public @ResponseBody ResponseEntity<Void> deleteCommodity(@RequestBody Commodity commodity, UriComponentsBuilder ucBuilder) {
       
	   commodityRepository.delete(commodity);

       HttpHeaders headers = new HttpHeaders();
       headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(commodity.getId()).toUri());
       return new ResponseEntity<Void>(headers, HttpStatus.OK);
   }
	
	//-------------------Retrieve All Commodities--------------------------------------------------------
	@RequestMapping("/commodities")
    public List<Commodity> getCommodities() 
    {
		List<Commodity> commodities = commodityRepository.findAll();
		return commodities;
    }
	
	//-------------------Retrieve All Users--------------------------------------------------------
	@RequestMapping("/users")
    public List<User> getUsers() 
    {
		List<User> users = userRepository.findAll();
		return users;
    }

	
	//-------------------Retrieve Single User by id--------------------------------------------------------
     @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        System.out.println("fetching user with id " + id);
        User user = userRepository.findById(id);
        System.out.println("user is " + user);
        if (user == null) {
            System.out.println("user with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
     
   //-------------------Retrieve Single User by username--------------------------------------------------------
    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<User> getUserByUsername(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println("fetching user with username " + username);
        User user = userRepository.findByUsername(username);
        System.out.println("user is " + user);
        if (user == null) {
        	user = new User(0, "", "", "", "", "");
            user.setLoggedInMessage("user " + username + " could not be authenticated.");
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        if (user != null && password != null && password.equals(user.getPassword())) {
            System.out.println("user " + username + " could not be authenticated.");
            user = new User(0, "", "", "", "", "");
            user.setLoggedInMessage("user " + username + " could not be found.");
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        user.setLoggedIn(true);
        System.out.println("going to authenticate user " + username);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    } 
 
    
    @RequestMapping(value = "/roles")
    public String[] getAllRoles() {
        return GeneralConstants.USER_ROLES;
    } 
     
     
    //-------------------Create a User--------------------------------------------------------
     
    @RequestMapping(value = "/user/create", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        System.out.println("check if can create user " + user.getUsername());
 
        if (userRepository.userExists(user.getUsername())) {
            System.out.println("a user with username " + user.getUsername() + " already exist");
            return new ResponseEntity<User>(HttpStatus.CONFLICT);
        }
 
        userRepository.save(user);
 
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<User>(headers, HttpStatus.CREATED);
    }
}
