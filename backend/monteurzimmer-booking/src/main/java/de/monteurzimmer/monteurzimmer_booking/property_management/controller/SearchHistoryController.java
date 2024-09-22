package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.SearchHistoryDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search-history")
@RequiredArgsConstructor
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;

    @GetMapping
    public ResponseEntity<List<SearchHistoryDTO>> getAllSearchHistories() {
        List<SearchHistoryDTO> searchHistories = searchHistoryService.getAllSearchHistories();
        return ResponseEntity.ok(searchHistories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> getSearchHistoryById(@PathVariable Long id) {
        SearchHistoryDTO searchHistory = searchHistoryService.getSearchHistoryById(id);
        return ResponseEntity.ok(searchHistory);
    }

    @PostMapping
    public ResponseEntity<SearchHistoryDTO> createSearchHistory(@RequestBody SearchHistoryDTO searchHistoryDTO) {
        SearchHistoryDTO createdSearchHistory = searchHistoryService.createSearchHistory(searchHistoryDTO);
        return ResponseEntity.status(201).body(createdSearchHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> updateSearchHistory(@PathVariable Long id, @RequestBody SearchHistoryDTO searchHistoryDTO) {
        SearchHistoryDTO updatedSearchHistory = searchHistoryService.updateSearchHistory(id, searchHistoryDTO);
        return ResponseEntity.ok(updatedSearchHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSearchHistory(@PathVariable Long id) {
        searchHistoryService.deleteSearchHistory(id);
        return ResponseEntity.noContent().build();
    }
}
