package com.example.Cinema;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaRepo extends JpaRepository<CinemaEntity, Long> {
	
	List<CinemaEntity> findAll();
	
}
