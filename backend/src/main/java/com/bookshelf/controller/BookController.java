package com.bookshelf.backend.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping
    public ResponseEntity<?> searchBooks(@RequestParam("q") String query) {

        String url = "https://openlibrary.org/search.json?q=" + UriUtils.encode(query, StandardCharsets.UTF_8);
        try {
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "Failed to fetch data from Open Library"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookDetail(@PathVariable("id") String id) {
        String url = "https://openlibrary.org/works/" + id + ".json";
        try {
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "Failed to fetch book detail"));
        }
    }
}
