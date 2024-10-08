import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/CitiesManagement.css'; // Add your styles

const CitiesManagement = () => {
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        isFavorite: false,
        iconPath: '',
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
            const response = await axios.get('http://localhost:8080/api/cities/all');
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/cities', formData);
            fetchCities(); // Refresh the cities list
            setAddModalOpen(false); // Close the modal
            resetForm();
        } catch (error) {
            console.error('Error adding city:', error);
        }
    };

    const handleUpdateCity = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/cities/${formData.id}`, formData);
            fetchCities(); // Refresh the cities list
            setUpdateModalOpen(false); // Close the modal
            resetForm();
        } catch (error) {
            console.error('Error updating city:', error);
        }
    };

    const handleRemoveCity = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/cities/${id}`);
            fetchCities(); // Refresh the cities list
        } catch (error) {
            console.error('Error removing city:', error);
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
            iconPath: '',
            latitude: '',
            longitude: '',
        });
    };

    return (
        <div>
            <h2>Cities Management</h2>

            <button onClick={() => setAddModalOpen(true)}>Add City</button>

            {/* Add City Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <h3>Add City</h3>
                    <form onSubmit={handleAddCity}>
                        <input
                            type="text"
                            name="name"
                            placeholder="City Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="iconPath"
                            placeholder="Icon Path"
                            value={formData.iconPath}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="isFavorite"
                                checked={formData.isFavorite}
                                onChange={handleInputChange}
                            />
                            Favorite
                        </label>
                        <button type="submit">Add City</button>
                        <button type="button" onClick={() => setAddModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Update City Modal */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <h3>Update City</h3>
                    <form onSubmit={handleUpdateCity}>
                        <input
                            type="text"
                            name="name"
                            placeholder="City Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="iconPath"
                            placeholder="Icon Path"
                            value={formData.iconPath}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="isFavorite"
                                checked={formData.isFavorite}
                                onChange={handleInputChange}
                            />
                            Favorite
                        </label>
                        <button type="submit">Update City</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Cities List */}
            <h3>Existing Cities</h3>
            <div className="cities-list">
                {cities.map((city) => (
                    <div key={city.id} className="city-card">
                        <h4>{city.name}</h4>
                        <p>Icon Path: {city.iconPath}</p>
                        <p>Coordinates: {city.latitude}, {city.longitude}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={city.isFavorite}
                                readOnly
                            />
                            Favorite
                        </label>
                        <button onClick={() => openUpdateModal(city)}>Update</button>
                        <button onClick={() => handleRemoveCity(city.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitiesManagement;
