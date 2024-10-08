// src/presentation/components/Admin/pages/PropertyCard.js

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style/PropertyCard.css';
import mockPhoto from "../pages/style/public/property-mock-photo.jpeg";

const PropertyCard = ({property}) => {
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
    }, [property.propertyId]);

    const handleSeeMoreClick = () => {
        navigate(`/admin/properties/${property.propertyId}`);
    };

    return (
        <div className="property-card"
             style={{backgroundImage: `url(${primaryPhotoUrl ||mockPhoto})`}}
        >
            <div className="property-card-content">

                <h3>{property.propertyName}</h3>
                <p><strong>Typen:</strong> {property.propertyType}</p>
                <p><strong>Adresse:</strong> {property.address}</p>
                <p><strong>Standort:</strong> {property.city.name}, {property.country}</p>
                <p><strong>Preis:</strong> €{property.price}</p>
                <p><strong>Bewertungen:</strong> {property.rating}</p>
                <p><strong>Maximale Gästezahl:</strong> {property.numberOfGuests}</p>
                <p><strong>Anzahl der Zimmer:</strong> {property.roomCount}</p>
                <p><strong>Anzahl der Badezimmer:</strong> {property.bathrooms}</p>
                <p>Erstellt am: {new Date(property.createdAt).toLocaleDateString()}</p>
                <button onClick={handleSeeMoreClick} className="see-more-button">
                    Mehr anzeigen
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
