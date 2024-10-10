import React, {useEffect, useState} from 'react';
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
            console.error('Error fetching cities:', error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value, type, checked, files} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        });
        // Log the file input for debugging
        if (type === 'file') {
            console.log('Selected file:', files[0]);
        }
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        if (formData.photoFile) { // Check if the photo file exists
            formDataToSend.append('photoFile', formData.photoFile); // Use 'photoFile'
        }
        formDataToSend.append('isFavorite', formData.isFavorite); // Append isFavorite
        formDataToSend.append('latitude', formData.latitude);
        formDataToSend.append('longitude', formData.longitude);

        // Log FormData entries for debugging
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            await axios.post(`${BASE_URL}/api/cities/add`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchCities(); // Refresh the cities list
            setAddModalOpen(false); // Close the modal
            resetForm();
        } catch (error) {
            console.error('Error adding city:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateCity = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('isFavorite', formData.isFavorite); // Append isFavorite
        if (formData.photoFile) { // Check if the photo file exists
            formDataToSend.append('photoFile', formData.photoFile); // Use 'photoFile'
        }
        formDataToSend.append('latitude', formData.latitude);
        formDataToSend.append('longitude', formData.longitude);

        try {
            await axios.put(`${BASE_URL}/api/cities/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchCities();
            setUpdateModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error updating city:', error);
        }
    };

    const handleRemoveCity = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/cities/${id}`);
            fetchCities();
        } catch (error) {
            console.error('Error removing city:', error);
        }
    };

    const handleFavoriteChange = async (event, cityId) => {
        const checked = event.target.checked;

        // Update the local cities state
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
            console.error("Error updating favorite status", error);
            // Revert the UI state if the request fails
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
            photoFile: null, // Reset photo file
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
                            placeholder="Name"
                            value={formData.name}
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
                        <input
                            type="file"
                            name="photoFile"
                            accept="image/*" // Accept image files only
                            onChange={handleInputChange}
                            required
                        />
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
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        <button type="submit">Update City</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            <div className="cities-list">
                {cities.map((city) => (
                    <div key={city.id} className="city-card"
                         style={{backgroundImage: `url(/city/${city.photo})`}}
                    >
                        <h4>{city.name}</h4>
                        <div className="city-details">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={city.isFavorite}
                                    onChange={(event) => handleFavoriteChange(event, city.id)} // Pass city.id correctly
                                />
                                Favorite
                            </label>
                            <button onClick={() => openUpdateModal(city)}>Update</button>
                            <button onClick={() => handleRemoveCity(city.id)}>Remove</button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default CitiesManagement;
