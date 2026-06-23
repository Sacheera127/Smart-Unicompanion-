package com.unicompanion.backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.xml.stream.Location;
import java.time.Instant;
import java.util.List;

@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    private String category; // BOARDING, FOOD, TRANSPORT
    private String title;
    private String description;
    private String area;
    private String university;

    private String status; // PENDING, APPROVED, REJECTED

    private Location location;
    private List<String> images;

    @DBRef
    private User postedBy;

    private Instant createdAt;

    // --- BOARDING specific fields ---
    private Double price;
    private String genderType;
    private Boolean hasKitchen;
    private String contact;
    private Double distance; // might be calculated, but frontend expects it
    private Boolean verified;

    // --- FOOD specific fields ---
    private String priceRange;
    private List<String> tags;
    private Double rating;
    private String openHours;

    // --- TRANSPORT specific fields ---
    private String routeNumber;
    private String fromLocation;
    private String toLocation;
    private String frequency;
    private String lastBus;

    private Integer reportCount; // auto hide after 5

    private boolean premium;


}


