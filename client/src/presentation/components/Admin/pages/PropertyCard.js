import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style/PropertyCard.css';
import mockPhoto from "../pages/style/public/property-mock-photo.jpeg";

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const [primaryPhotoUrl, setPrimaryPhotoUrl] = useState('');

    useEffect(() => {
        const fetchPrimaryPhoto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/photos/primary/${property.propertyId}`);
                setPrimaryPhotoUrl(response.data.photoUrl); // Adjust this based on your actual API response
            } catch (error) {
                console.error('Error fetching primary photo:', error);
            }
        };

        fetchPrimaryPhoto();
    }, [property]);

    const handleSeeMoreClick = () => {
        if (property && property.id) { // Ensure property exists before accessing its ID
            navigate(`/admin/properties/${property.id}`);
        }
    };

    if (!property) {
        return <div>Property data is unavailable</div>; // Fallback if property is null or undefined
    }

    return (
        <div className="property-card"
             style={{backgroundImage: `url(${primaryPhotoUrl || mockPhoto})`}}
        >
            <div className="property-card-content">

                <h3>{property.propertyName || 'Unnamed Property'}</h3>
                <p><strong>Typen:</strong> {property.propertyType || 'N/A'}</p>
                <p><strong>Adresse:</strong> {property.address || 'N/A'}</p>
                <p><strong>Standort:</strong> {(property.city && property.city.name) ? property.city.name : 'N/A'}, {property.country || 'N/A'}</p>
                <p><strong>Preis:</strong> €{property.price || 'N/A'}</p>
                <p><strong>Bewertungen:</strong> {property.rating || 'No ratings'}</p>
                <p><strong>Maximale Gästezahl:</strong> {property.numberOfGuests || 'N/A'}</p>
                <p><strong>Anzahl der Zimmer:</strong> {property.roomCount || 'N/A'}</p>
                <p><strong>Anzahl der Badezimmer:</strong> {property.bathrooms || 'N/A'}</p>
                <p>Erstellt am: {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Unknown date'}</p>
                <button onClick={handleSeeMoreClick} className="see-more-button">
                    Mehr anzeigen
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
