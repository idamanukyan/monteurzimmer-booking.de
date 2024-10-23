import React, { useEffect, useState } from "react";
import axios from "axios";
import './style/PropertiesList.css';
import PropertyCard from './PropertyCard';

const PropertiesList = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Number of properties per page
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        // Filter properties whenever the search term changes
        setFilteredProperties(
            properties.filter(property =>
                property.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, properties]);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/properties/latest");
            setProperties(response.data);
            setFilteredProperties(response.data); // Initialize filtered properties
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const totalPages = Math.ceil(filteredProperties.length / pageSize);

    // Get the properties for the current page after filtering
    const currentProperties = filteredProperties.slice(
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
        <div className="properties-list-container">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Nach Monteurzimmern suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="properties-list">
                {currentProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {/* Pagination controls */}
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

            {/* Message if no properties found */}
            {filteredProperties.length === 0 && (
                <p className="no-properties-message">Keine Monteurzimmer gefunden.</p>
            )}
        </div>
    );
};

export default PropertiesList;
