import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './style/AllProperties.css';
import SearchBox from '../layout/SearchBox';

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [url, setUrl] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [filters, setFilters] = useState({
        city: {},
        numberOfGuests: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
    });

    const pageSize = 9;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchAllProperties = async () => {
        try {
            const response = await axiosInstance.get('/properties');
            setProperties(response.data);
            setTotalProperties(response.data.length);
        } catch (error) {
            console.error('Error fetching all properties:', error);
        }
    };

    const fetchFilteredProperties = async (filterSearchPropertyDTO) => {
        try {
            const response = await axiosInstance.post('/properties/search-result', filterSearchPropertyDTO);
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
    const currentProperties = properties.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

    const handleFindByLink = async () => {
        try {
            const encodedUrl = encodeURIComponent(url);
            const response = await axiosInstance.get(`/properties/find-by-link?url=${encodedUrl}`);
            const newProperty = response.data;

            if (newProperty && newProperty.id) {
                navigate(`/admin/properties/${newProperty.id}`);
            } else {
                setProperties([]);
            }

            setUrl('');
        } catch (error) {
            console.error('Error fetching property by link:', error);
            setProperties([]);
        }
    };

    return (
        <div className="all-properties">
            <h2>Alle Immobilien</h2>

            <a href="/admin/configure-properties" className="configure-properties-button">
                Immobilien konfigurieren
            </a>

            <SearchBox
                filters={filters}
                setFilters={setFilters}
                fetchFilteredProperties={fetchFilteredProperties}
            />

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Geben Sie die URL der Immobilie ein"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="url-input"
                />
                <button
                    onClick={handleFindByLink}
                    disabled={!url}
                    className="find-property-button"
                >
                    Objekt per URL finden
                </button>
            </div>

            {properties.length > 0 ? (
                <div className="properties-list">
                    {currentProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <p>Keine Objekte verfügbar</p>
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
                    Seite {currentPage} von {totalPages} Seiten
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