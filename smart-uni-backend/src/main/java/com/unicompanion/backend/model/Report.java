package com.unicompanion.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "reports")
public class Report {

    @Id
    private String id;

    @DBRef
    private Post post;

    @DBRef
    private User reportedBy;

    private String university;
    private String reason;
    private String message;
    private String status; // PENDING, RESOLVED, DISMISSED

    private Instant createdAt;

    public Report() {}

}
