import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './style/AllProperties.css';
import SearchBox from '../layout/SearchBox'; // Import your SearchBox component

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [filters, setFilters] = useState({
        city:{},
        numberOfGuests: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
    });
    const pageSize = 9;


    const fetchAllProperties = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/properties`);
            console.log('All properties response:', response.data);
            setProperties(response.data);
            setTotalProperties(response.data.length);
        } catch (error) {
            console.error('Error fetching all properties:', error);
        }
    };

    const fetchFilteredProperties = async (filterSearchPropertyDTO) => {
        try {
            const response = await axios.post('http://localhost:8080/api/properties/search-result', filterSearchPropertyDTO);
            console.log("Filtered properties:", response.data);

            setProperties(response.data);
            setTotalProperties(response.data.length);
        } catch (error) {
            console.error('Error fetching filtered properties:', error);
        }
    };

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const totalPages = Math.ceil(totalProperties / pageSize);
    const currentProperties = properties.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="all-properties">
            <h2>Alle Eigenschaften</h2>

            {/* Integrating the SearchBox */}
            <SearchBox
                filters={filters}
                setFilters={setFilters}
                fetchFilteredProperties={fetchFilteredProperties}
            />

            {/* Button that links to Configure Properties page */}
            <a href="/admin/configure-properties" className="configure-properties-button">
                Konfigurieren von Eigenschaften
            </a>

            {/* Check if properties are available */}
            {properties.length > 0 ? (
                <div className="properties-list">
                    {currentProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <p>No properties available</p>
            )}

            <div className="pagination-controls">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Zurück
                </button>
                <span className="pagination-info">
                    Seite {currentPage} von {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default AllProperties;
