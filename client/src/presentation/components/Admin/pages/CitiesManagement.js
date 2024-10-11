import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/CitiesManagement.css';

const CitiesManagement = () => {
    const BASE_URL = 'http://localhost:8080'; // Update this with your backend's base URL
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        isFavorite: false,
        photoFile: null,
        latitude: '',
        longitude: '',
    });
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/cities/all`);
            setCities(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Städte:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        });
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('isFavorite', formData.isFavorite);
        formDataToSend.append('latitude', formData.latitude);
        formDataToSend.append('longitude', formData.longitude);
        if (formData.photoFile) {
            formDataToSend.append('photoFile', formData.photoFile);
        }

        try {
            await axios.post(`${BASE_URL}/api/cities/add`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchCities(); // Refresh city list
            setAddModalOpen(false); // Close modal
            resetForm();
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Stadt:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateCity = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('isFavorite', formData.isFavorite);
        formDataToSend.append('latitude', formData.latitude);
        formDataToSend.append('longitude', formData.longitude);
        if (formData.photoFile) {
            formDataToSend.append('photoFile', formData.photoFile);
        }

        try {
            await axios.put(`${BASE_URL}/api/cities/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchCities(); // Refresh city list
            setUpdateModalOpen(false); // Close modal
            resetForm();
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Stadt:', error);
        }
    };

    const handleRemoveCity = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/cities/${id}`);
            fetchCities(); // Refresh city list
        } catch (error) {
            console.error('Fehler beim Entfernen der Stadt:', error);
        }
    };

    const handleFavoriteChange = async (event, cityId) => {
        const checked = event.target.checked;
        setCities((prevCities) =>
            prevCities.map((city) =>
                city.id === cityId ? { ...city, isFavorite: checked } : city
            )
        );

        try {
            const url = checked
                ? `${BASE_URL}/api/cities/${cityId}/favorite`
                : `${BASE_URL}/api/cities/${cityId}/unfavorite`;

            await axios.post(url);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Favoritenstatus", error);
            setCities((prevCities) =>
                prevCities.map((city) =>
                    city.id === cityId ? { ...city, isFavorite: !checked } : city
                )
            );
        }
    };

    const openUpdateModal = (city) => {
        setFormData(city);
        setUpdateModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            isFavorite: false,
            photoFile: null,
            latitude: '',
            longitude: '',
        });
    };

    return (
        <div>
            <h2>Städteverwaltung</h2>

            <button onClick={() => setAddModalOpen(true)}>Stadt hinzufügen</button>

            {/* Add City Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <h3>Stadt hinzufügen</h3>
                    <form onSubmit={handleAddCity}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Stadtname"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Breitengrad"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Längengrad"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="file"
                            name="photoFile"
                            accept="image/*"
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Anwenden</button>
                        <button type="button" onClick={() => setAddModalOpen(false)}>Abbrechen</button>
                    </form>
                </div>
            )}

            {/* Update City Modal */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <h3>Stadt aktualisieren</h3>
                    <form onSubmit={handleUpdateCity}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Stadtname"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Breitengrad"
                            value={formData.latitude}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Längengrad"
                            value={formData.longitude}
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            name="photoFile"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        <button type="submit">Anwenden</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Abbrechen</button>
                    </form>
                </div>
            )}

            <div className="cities-list">
                {cities.map((city) => (
                    <div key={city.id} className="city-card" style={{ backgroundImage: `url(/city/${city.photo})` }}>
                        <h4>{city.name}</h4>
                        <div className="city-details">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={city.isFavorite}
                                    onChange={(event) => handleFavoriteChange(event, city.id)}
                                />
                                Favorit
                            </label>
                            <button onClick={() => openUpdateModal(city)}>Aktualisieren</button>
                            <button onClick={() => handleRemoveCity(city.id)}>Entfernen</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitiesManagement;
