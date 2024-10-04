package de.monteurzimmer.monteurzimmer_booking.property_management.controller;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.SearchHistoryDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(SearchHistoryController.class);

    private final SearchHistoryService searchHistoryService;

    @GetMapping
    public ResponseEntity<List<SearchHistoryDTO>> getAllSearchHistories() {
        logger.debug("Fetching all search histories.");
        List<SearchHistoryDTO> searchHistories = searchHistoryService.getAllSearchHistories();
        logger.info("Retrieved {} search histories.", searchHistories.size());
        return ResponseEntity.ok(searchHistories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> getSearchHistoryById(@PathVariable Long id) {
        logger.debug("Fetching search history with ID: {}", id);
        SearchHistoryDTO searchHistory = searchHistoryService.getSearchHistoryById(id);
        logger.info("Retrieved search history: {}", searchHistory);
        return ResponseEntity.ok(searchHistory);
    }

    @PostMapping
    public ResponseEntity<SearchHistoryDTO> createSearchHistory(@RequestBody SearchHistoryDTO searchHistoryDTO) {
        logger.debug("Creating search history: {}", searchHistoryDTO);
        SearchHistoryDTO createdSearchHistory = searchHistoryService.createSearchHistory(searchHistoryDTO);
        logger.info("Successfully created search history: {}", createdSearchHistory);
        return ResponseEntity.status(201).body(createdSearchHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SearchHistoryDTO> updateSearchHistory(@PathVariable Long id, @RequestBody SearchHistoryDTO searchHistoryDTO) {
        logger.debug("Updating search history ID {}: {}", id, searchHistoryDTO);
        SearchHistoryDTO updatedSearchHistory = searchHistoryService.updateSearchHistory(id, searchHistoryDTO);
        logger.info("Successfully updated search history ID {}: {}", id, updatedSearchHistory);
        return ResponseEntity.ok(updatedSearchHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSearchHistory(@PathVariable Long id) {
        logger.debug("Deleting search history ID {}.", id);
        searchHistoryService.deleteSearchHistory(id);
        logger.info("Successfully deleted search history ID {}.", id);
        return ResponseEntity.noContent().build();
    }
}
