import React, { useEffect, useState } from 'react';
import './style/SearchBox.css';
import FilterModal from '../layout/FilterModal';
import filterIcon from '../pages/style/public/filter.svg';
import axios from "axios";
import { FilterSearchPropertyDTO } from "../models/FilterSearchPropertyDTO";

const SearchBox = ({ filters, setFilters, fetchFilteredProperties }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);

    const fetchCities = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cities/all`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const mapFiltersToDTO = () => {
        const dto = new FilterSearchPropertyDTO();
        dto.city = filters.city ? { name: filters.city } : null;
        dto.numberOfGuests = filters.numberOfGuests;
        dto.propertyType = filters.propertyType;
        dto.minPrice = filters.minPrice;
        dto.maxPrice = filters.maxPrice;
        dto.distance = filters.distance;
        dto.wifi = filters.wifi;
        dto.tv = filters.tv;
        dto.privateBath = filters.privateBath;
        dto.cookingFacilities = filters.cookingFacilities;
        dto.separateBeds = filters.separateBeds;
        dto.radio = filters.radio;
        dto.towels = filters.towels;
        dto.fridge = filters.fridge;
        dto.coffeeMachine = filters.coffeeMachine;
        dto.microwave = filters.microwave;
        dto.dishwasher = filters.dishwasher;
        dto.wc = filters.wc;
        dto.terrace = filters.terrace;
        dto.kettle = filters.kettle;
        dto.bathtub = filters.bathtub;
        dto.garden = filters.garden;
        dto.cookingUtensils = filters.cookingUtensils;
        dto.washingMachine = filters.washingMachine;
        dto.smoking = filters.smoking;
        dto.quietLocation = filters.quietLocation;
        dto.goodTransportation = filters.goodTransportation;
        dto.shopsNearby = filters.shopsNearby;
        return dto;
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleApplyFilters = () => {
        const dto = mapFiltersToDTO();
        fetchFilteredProperties(dto);
        setIsModalOpen(false);
    };

    return (
        <div className="search-box-container">
            <div className="search-inputs">
                <div className="input-group city-input">
                    <label>Stadt</label>
                    {loadingCities ? (
                        <input type="text" placeholder="Lädt..." className="search-input" disabled />
                    ) : (
                        <select
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            className="search-input"
                        >
                            <option value="">Wählen Sie eine Stadt</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="input-group min-price-input">
                    <label>Min Preis</label>
                    <input
                        type="number"
                        placeholder="8"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        className="search-input"
                    />
                </div>
                <div className="input-group guests-input">
                    <label>Gäste</label>
                    <input
                        type="number"
                        placeholder="2"
                        value={filters.numberOfGuests}
                        onChange={(e) => setFilters({ ...filters, numberOfGuests: e.target.value })}
                        className="search-input small-input"
                        min={1}
                        max={50}
                    />
                </div>
            </div>
            <div className="search-inputs">
                <div className="input-group property-type-input">
                    <label>Eigenschaftstyp</label>
                    <select
                        value={filters.propertyType}
                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                        className="search-input"
                    >
                        <option value="">Wählen Sie einen Typ</option>
                        <option value="Gästezimmer">Gästezimmer</option>
                        <option value="Haus">Haus</option>
                        <option value="Wohnung">Wohnung</option>
                        <option value="Pension">Pension</option>
                        <option value="Herberge">Herberge</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Andere">Andere</option>
                    </select>
                </div>
                <div className="input-group max-price-input">
                    <label>Max Preis</label>
                    <input
                        type="number"
                        placeholder="50"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        className="search-input"
                    />
                </div>
                <div className="filter-button-container button-container">
                    <button className="filter-button" onClick={handleOpenModal}>
                        <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
                        <span className="filter-text">Filter</span>
                    </button>
                </div>
                <div className="apply-button-container button-container">
                    <button className="apply-button" onClick={handleApplyFilters}>
                        Filter Anwenden
                    </button>
                </div>
            </div>
            <FilterModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onApply={handleApplyFilters}
                filters={filters}
                setFilters={setFilters}
            />
        </div>
    );
};

export default SearchBox;