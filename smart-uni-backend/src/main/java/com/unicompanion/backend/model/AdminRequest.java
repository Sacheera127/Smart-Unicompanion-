package com.unicompanion.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "adminRequests")

public class AdminRequest {
    @Id
    private String id;

    @DBRef
    private User user;

    private String name;
    private String email;
    private String university;
    private String area;
    private Integer yearOfStudy;

    private String idCardUrl;

    private String status; // PENDING, APPROVED, REJECTED

    private Instant createdAt;
}
