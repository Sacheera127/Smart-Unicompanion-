package com.unicompanion.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.util.Map;

@Service
public class FileStorageService {

    @Value("${app.imgbb.key}")
    private String imgbbApiKey;

    public String storeFile(MultipartFile file) {
        try {
            if (imgbbApiKey == null || imgbbApiKey.isEmpty()) {
                throw new RuntimeException("ImgBB API key is not configured");
            }

            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.imgbb.com/1/upload?key=" + imgbbApiKey;


    }
}
