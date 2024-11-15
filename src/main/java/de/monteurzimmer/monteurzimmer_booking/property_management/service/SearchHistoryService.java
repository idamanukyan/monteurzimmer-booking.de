package de.monteurzimmer.monteurzimmer_booking.property_management.service;

import de.monteurzimmer.monteurzimmer_booking.property_management.entity.SearchHistory;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.SearchHistoryDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final ModelMapper modelMapper;

    public List<SearchHistoryDTO> getAllSearchHistories() {
        List<SearchHistory> searchHistories = searchHistoryRepository.findAll();
        return searchHistories.stream()
                .map(history -> modelMapper.map(history, SearchHistoryDTO.class))
                .collect(Collectors.toList());
    }

    public SearchHistoryDTO getSearchHistoryById(Long id) {
        SearchHistory searchHistory = searchHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search History not found"));
        return modelMapper.map(searchHistory, SearchHistoryDTO.class);
    }

    public SearchHistoryDTO createSearchHistory(SearchHistoryDTO searchHistoryDTO) {
        SearchHistory searchHistory = modelMapper.map(searchHistoryDTO, SearchHistory.class);
        SearchHistory savedHistory = searchHistoryRepository.save(searchHistory);
        return modelMapper.map(savedHistory, SearchHistoryDTO.class);
    }

    public SearchHistoryDTO updateSearchHistory(Long id, SearchHistoryDTO searchHistoryDTO) {
        SearchHistory searchHistory = searchHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search History not found"));

        modelMapper.map(searchHistoryDTO, searchHistory);
        SearchHistory updatedHistory = searchHistoryRepository.save(searchHistory);
        return modelMapper.map(updatedHistory, SearchHistoryDTO.class);
    }

    public void deleteSearchHistory(Long id) {
        SearchHistory searchHistory = searchHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search History not found"));
        searchHistoryRepository.delete(searchHistory);
    }
}

