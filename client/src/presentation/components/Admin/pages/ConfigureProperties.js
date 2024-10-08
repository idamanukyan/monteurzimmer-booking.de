import React, {useState} from 'react';
import axios from 'axios';
import './style/ConfigureProperties.css';
import PropertiesList from './PropertiesList'; // Import your PropertiesList component

const ConfigureProperties = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [formData, setFormData] = useState({
        propertyName: '',
        propertyType: '',
        pricePerNight: '',
        description: '',
    });

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Handle form submission for adding a property
    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/properties', formData);
            setFormData({
                propertyName: '',
                propertyType: '',
                pricePerNight: '',
                description: '',
            });
            setAddModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    // Handle form submission for updating a property
    const handleUpdateProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/properties/${selectedProperty.propertyId}`, formData);
            setFormData({
                propertyName: '',
                propertyType: '',
                pricePerNight: '',
                description: '',
            });
            setUpdateModalOpen(false); // Close the modal
            setSelectedProperty(null); // Reset selected property
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    // Handle hiding/removing a property
    const handleRemoveProperty = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/${selectedProperty.propertyId}`);
            setRemoveModalOpen(false); // Close the modal
            setSelectedProperty(null); // Reset selected property
        } catch (error) {
            console.error('Error removing property:', error);
        }
    };

    // Open update modal with selected property data
    const openUpdateModal = (property) => {
        setSelectedProperty(property);
        setFormData({
            propertyName: property.propertyName,
            propertyType: property.propertyType,
            pricePerNight: property.pricePerNight,
            description: property.description,
        });
        setUpdateModalOpen(true);
    };

    return (
        <div>
            <h2>Configure Properties</h2>

            {/* Button Container */}
            <div className="button-container">
                {/* Add Property Button */}
                <div className="button-box">
                    <button onClick={() => setAddModalOpen(true)}>Add Property</button>
                </div>

                {/* Update Property Button */}
                <div className="button-box">
                    <button onClick={() => setUpdateModalOpen(true)}>Update Property</button>
                </div>

                {/* Remove Property Button */}
                <div className="button-box">
                    <button onClick={() => setRemoveModalOpen(true)}>Remove Property</button>
                </div>
            </div>

            {/* Add Property Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <h3>Add Property</h3>
                    <form onSubmit={handleAddProperty}>
                        <input
                            type="text"
                            name="propertyName"
                            placeholder="Property Name"
                            value={formData.propertyName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="propertyType"
                            placeholder="Property Type"
                            value={formData.propertyType}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="pricePerNight"
                            placeholder="Price Per Night"
                            value={formData.pricePerNight}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Add Property</button>
                        <button type="button" onClick={() => setAddModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Update Property Modal */}
            {isUpdateModalOpen && selectedProperty && (
                <div className="modal">
                    <h3>Update Property</h3>
                    <form onSubmit={handleUpdateProperty}>
                        <input
                            type="text"
                            name="propertyName"
                            placeholder="Property Name"
                            value={formData.propertyName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="propertyType"
                            placeholder="Property Type"
                            value={formData.propertyType}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="pricePerNight"
                            placeholder="Price Per Night"
                            value={formData.pricePerNight}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Update Property</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Remove Property Modal */}
            {isRemoveModalOpen && selectedProperty && (
                <div className="modal">
                    <h3>Remove Property</h3>
                    <p>Are you sure you want to remove {selectedProperty.propertyName}?</p>
                    <button onClick={handleRemoveProperty}>Yes, Remove</button>
                    <button type="button" onClick={() => setRemoveModalOpen(false)}>Close</button>
                </div>
            )}

            {/* List of Existing Properties */}
            <h3>Existing Properties</h3>
            <PropertiesList openUpdateModal={openUpdateModal} setRemoveModalOpen={setRemoveModalOpen}
                            setSelectedProperty={setSelectedProperty}/>
        </div>
    );
};

export default ConfigureProperties;

