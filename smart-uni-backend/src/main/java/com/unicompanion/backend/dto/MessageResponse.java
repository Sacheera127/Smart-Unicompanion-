package com.unicompanion.backend.dto;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    //check the method here.
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}