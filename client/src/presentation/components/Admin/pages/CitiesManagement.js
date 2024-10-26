import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/CitiesManagement.css';

const CitiesManagement = () => {
    const BASE_URL = 'http://localhost:8080';
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        isFavorite: false,
        latitude: '',
        longitude: '',
    });
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

    // Function to get the token from local storage or another source
    const getToken = () => {
        return localStorage.getItem('token'); // Adjust this line based on your token storage
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/cities/all`, {
            });
            setCities(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Städte:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        const { name, isFavorite, latitude, longitude } = formData;

        try {
            await axios.post(`${BASE_URL}/api/cities/add`, { name, isFavorite, latitude, longitude }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Include the token in the header
                },
            });
            fetchCities();
            setAddModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Stadt:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateCity = async (e) => {
        e.preventDefault();
        const { id, name, isFavorite, latitude, longitude } = formData;

        try {
            await axios.put(`${BASE_URL}/api/cities/${id}`, { name, isFavorite, latitude, longitude }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Include the token in the header
                },
            });
            fetchCities();
            setUpdateModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Stadt:', error);
        }
    };

    const handleRemoveCity = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/cities/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Include the token in the header
                },
            });
            fetchCities();
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

            await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Include the token in the header
                },
            });
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
            latitude: '',
            longitude: '',
        });
    };

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Städteverwaltung</h2>

            <input
                type="text"
                placeholder="Stadtname suchen"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button onClick={() => setAddModalOpen(true)}>Stadt hinzufügen</button>

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
                        <button type="submit">Anwenden</button>
                        <button type="button" onClick={() => setAddModalOpen(false)}>Abbrechen</button>
                    </form>
                </div>
            )}

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
                        <button type="submit">Anwenden</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Abbrechen</button>
                    </form>
                </div>
            )}

            <table className="cities-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Favorit</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {filteredCities.map((city) => (
                    <tr key={city.id}>
                        <td>{city.name}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={city.isFavorite}
                                onChange={(event) => handleFavoriteChange(event, city.id)}
                            />
                        </td>
                        <td>
                            <button onClick={() => openUpdateModal(city)}>Aktualisieren</button>
                            <button onClick={() => handleRemoveCity(city.id)}>Entfernen</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CitiesManagement;