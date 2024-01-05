package com.example.Cinema;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_list") 
public class CinemaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long Id;
    private String Name;
    private String Price;
    private String URL;
    private String Image;
    private String Artist;
    private String Category;
    private String Releasedate;
    private String Rights;
    private String Summary; 
    
	public Long getID() {
		return Id;
	}
	public void setID(Long id) {
		Id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getPrice() {
		return Price;
	}
	public void setPrice(String price) {
		Price = price;
	}
	public String getURL() {
		return URL;
	}
	public void setURL(String uRL) {
		URL = uRL;
	}
	public String getImage() {
		return Image;
	}
	public void setImage(String image) {
		Image = image;
	}
	public String getArtist() {
		return Artist;
	}
	public void setArtist(String artist) {
		Artist = artist;
	}
	public String getCategory() {
		return Category;
	}
	public void setCategory(String category) {
		Category = category;
	}
	public String getReleasedate() {
		return Releasedate;
	}
	public void setReleasedate(String releasedate) {
		Releasedate = releasedate;
	}
	public String getRights() {
		return Rights;
	}
	public void setRights(String rights) {
		Rights = rights;
	}
	public String getSummary() {
		return Summary;
	}
	public void setSummary(String summary) {
		Summary = summary;
	}
}
