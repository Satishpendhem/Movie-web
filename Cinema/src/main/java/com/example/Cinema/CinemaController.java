// CinemaController.java
package com.example.Cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/cinema")
public class CinemaController {
    private final CinemaRepo cinemaQueries;
    private final UserRepo userQueries;

    @Autowired
    public CinemaController(CinemaRepo cinemaQueries, UserRepo userQueries) {
        this.cinemaQueries = cinemaQueries;
        this.userQueries = userQueries;
    }

    @GetMapping(path = "/getData")
    public List<CinemaEntity> movies() {
        return cinemaQueries.findAll();
    }

    @PostMapping(path = "/userInfo")
    public ResponseEntity<Object> saveUserDetails(@RequestBody UserEntity user) {
        if (user.getUserName() == null) {
            return ResponseEntity.badRequest().build();
        }
        

        UserEntity savedUser=null;
        try{
        	savedUser = userQueries.save(user);
        }
        catch(Exception e)
        {
        	return ResponseEntity.status(409).body("User already exists");
        }
        return ResponseEntity.ok(savedUser);
    }
}