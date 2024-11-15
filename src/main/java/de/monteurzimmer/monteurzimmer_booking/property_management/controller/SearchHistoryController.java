package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.SearchHistoryDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.SearchHistoryService;
import de.monteurzimmer.monteurzimmer_booking.log.LogEntryService; // Import your custom log service
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing search histories in the application.
 * Provides endpoints for creating, retrieving, updating, and deleting search histories.
 * <p>
 * API Endpoints:
 * - GET /api/search-history: Retrieve all search histories
 * - GET /api/search-history/{id}: Retrieve a search history by its ID
 * - POST /api/search-history: Create a new search history
 * - PUT /api/search-history/{id}: Update an existing search history
 * - DELETE /api/search-history/{id}: Delete a search history by its ID
 */
@RestController
@RequestMapping("/api/search-history")
@RequiredArgsConstructor
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;
    private final LogEntryService logEntryService; // Add your custom log service

    @GetMapping
    public ResponseEntity<List<SearchHistoryDTO>> getAllSearchHistories() {
        List<SearchHistoryDTO> searchHistories = searchHistoryService.getAllSearchHistories();
        logEntryService.log("INFO", "Retrieved {} search histories." + searchHistories.size());
        return ResponseEntity.ok(searchHistories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> getSearchHistoryById(@PathVariable Long id) {
        SearchHistoryDTO searchHistory = searchHistoryService.getSearchHistoryById(id);
        logEntryService.log("INFO", "Retrieved search history: {}" + searchHistory);
        return ResponseEntity.ok(searchHistory);
    }

    @PostMapping
    public ResponseEntity<SearchHistoryDTO> createSearchHistory(@RequestBody SearchHistoryDTO searchHistoryDTO) {
        SearchHistoryDTO createdSearchHistory = searchHistoryService.createSearchHistory(searchHistoryDTO);
        logEntryService.log("INFO", "Successfully created search history: {}" + createdSearchHistory);
        return ResponseEntity.status(201).body(createdSearchHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> updateSearchHistory(@PathVariable Long id, @RequestBody SearchHistoryDTO searchHistoryDTO) {
        SearchHistoryDTO updatedSearchHistory = searchHistoryService.updateSearchHistory(id, searchHistoryDTO);
        logEntryService.log("INFO", "Successfully updated search history ID {}: {}" + id + updatedSearchHistory);
        return ResponseEntity.ok(updatedSearchHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSearchHistory(@PathVariable Long id) {
        searchHistoryService.deleteSearchHistory(id);
        logEntryService.log("INFO", "Successfully deleted search history ID {}." + id);
        return ResponseEntity.noContent().build();
    }
}
