import React, {useEffect, useState} from "react";
import axios from "axios";
import './style/PropertiesList.css';
import PropertyCard from './PropertyCard';

const PropertiesList = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; // Number of properties per page

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/properties/latest");
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const totalPages = Math.ceil(properties.length / pageSize);

    // Get the properties for the current page
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
        <div className="properties-list-container">
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
        </div>
    );
};

export default PropertiesList;
