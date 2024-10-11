import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './style/AllProperties.css';
import SearchBox from '../layout/SearchBox'; // Import your SearchBox component

const AllProperties = () => {
    const [properties, setProperties] = useState([]); // State for all properties
    const [url, setUrl] = useState(''); // State for URL input
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [totalProperties, setTotalProperties] = useState(0); // Total property count
    const [filters, setFilters] = useState({
        city: {},
        numberOfGuests: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
    });

    const pageSize = 9;
    const navigate = useNavigate(); // Use navigate hook for programmatic navigation

    // Fetch all properties on initial render
    const fetchAllProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/properties');
            console.log('Fetched all properties:', response.data);
            setProperties(response.data);
            setTotalProperties(response.data.length);
        } catch (error) {
            console.error('Error fetching all properties:', error);
        }
    };

    // Fetch filtered properties based on search criteria
    const fetchFilteredProperties = async (filterSearchPropertyDTO) => {
        try {
            const response = await axios.post('http://localhost:8080/api/properties/search-result', filterSearchPropertyDTO);
            console.log('Fetched filtered properties:', response.data);
            setProperties(response.data);
            setTotalProperties(response.data.length);
        } catch (error) {
            console.error('Error fetching filtered properties:', error);
        }
    };

    // Fetch all properties when the component mounts
    useEffect(() => {
        fetchAllProperties();
    }, []);

    // Logic to calculate pagination pages
    const totalPages = Math.ceil(totalProperties / pageSize);
    const currentProperties = properties.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Handle next page click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    // Handle previous page click
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    // Fetch property by URL and redirect to property details page
    const handleFindByLink = async () => {
        try {
            const encodedUrl = encodeURIComponent(url); // Encode URL before making the request
            console.log(`Fetching property by URL: ${url}`);

            const response = await axios.get(`http://localhost:8080/api/properties/find-by-link?url=${encodedUrl}`);
            const newProperty = response.data;

            console.log('Property fetched by URL:', newProperty);

            // After fetching the property, redirect to the details page of the fetched property
            if (newProperty && newProperty.id) {
                navigate(`/admin/properties/${newProperty.id}`); // Redirect to the dynamic property details page
            } else {
                console.log('Property not found or invalid response.');
            }

            setUrl(''); // Clear the input after fetching
        } catch (error) {
            console.error('Error fetching property by link:', error);
        }
    };

    return (
        <div className="all-properties">
            <h2>Alle Eigenschaften</h2>

            <a href="/admin/configure-properties" className="configure-properties-button">
                Konfigurieren von Eigenschaften
            </a>

            {/* Integrating the SearchBox */}
            <SearchBox
                filters={filters}
                setFilters={setFilters}
                fetchFilteredProperties={fetchFilteredProperties}
            />

            <input
                type="text"
                placeholder="Enter property URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)} // Update the URL state
            />
            <button
                onClick={handleFindByLink}
                disabled={!url} // Disable the button if the URL input is empty
                className="find-property-button"
            >
                Find Property by Link
            </button>


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
