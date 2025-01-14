package de.monteurzimmer.monteurzimmer_booking.property_management.service;


import de.monteurzimmer.monteurzimmer_booking.property_management.entity.RelatedProperties;
import de.monteurzimmer.monteurzimmer_booking.property_management.entity.dto.RelatedPropertyDTO;
import de.monteurzimmer.monteurzimmer_booking.property_management.repository.RelatedPropertyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RelatedPropertyService {

    private final RelatedPropertyRepository relatedPropertyRepository;
    private final ModelMapper modelMapper;

    public List<RelatedPropertyDTO> getAllRelatedProperties() {
        List<RelatedProperties> relatedProperties = relatedPropertyRepository.findAll();
        return relatedProperties.stream()
                .map(relatedProperty -> modelMapper.map(relatedProperty, RelatedPropertyDTO.class))
                .collect(Collectors.toList());
    }

    public RelatedPropertyDTO getRelatedPropertyById(Long id) {
        RelatedProperties relatedProperty = relatedPropertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Related Property not found"));
        return modelMapper.map(relatedProperty, RelatedPropertyDTO.class);
    }

    public RelatedPropertyDTO createRelatedProperty(RelatedPropertyDTO relatedPropertyDTO) {
        RelatedProperties relatedProperty = modelMapper.map(relatedPropertyDTO, RelatedProperties.class);
        RelatedProperties savedRelatedProperty = relatedPropertyRepository.save(relatedProperty);
        return modelMapper.map(savedRelatedProperty, RelatedPropertyDTO.class);
    }

    public RelatedPropertyDTO updateRelatedProperty(Long id, RelatedPropertyDTO relatedPropertyDTO) {
        RelatedProperties relatedProperty = relatedPropertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Related Property not found"));

        modelMapper.map(relatedPropertyDTO, relatedProperty);
        RelatedProperties updatedRelatedProperty = relatedPropertyRepository.save(relatedProperty);
        return modelMapper.map(updatedRelatedProperty, RelatedPropertyDTO.class);
    }

    public void deleteRelatedProperty(Long id) {
        RelatedProperties relatedProperty = relatedPropertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Related Property not found"));
        relatedPropertyRepository.delete(relatedProperty);
    }
}

