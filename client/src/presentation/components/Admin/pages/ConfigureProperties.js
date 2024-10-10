import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ConfigureProperties.css';
import PropertiesList from './PropertiesList';
import AddPropertyModal from '../layout/AddPropertyModal';
import RemovePropertyModal from '../layout/RemovePropertyModal';

const ConfigureProperties = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        propertyName: '',
        propertyType: '',
        price: '',
        description: '',
        facilities: [],
    });

    const [filterResults, setFilterResults] = useState([]);

    useEffect(() => {
        fetchProperties(); // Fetch properties on component mount
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/properties');
            setProperties(response.data || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                facilities: filterResults // Include filter results in the request
            };
            await axios.post('http://localhost:8080/api/properties', dataToSend);
            resetForm();
            setAddModalOpen(false); // Close modal after adding property
            fetchProperties(); // Re-fetch the property list after adding
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const handleRemoveProperty = async (url) => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/remove/by/link`, {
                params: {
                    url: url // Pass the property URL as a query parameter
                }
            });
            setRemoveModalOpen(false); // Close modal after deletion
            fetchProperties(); // Re-fetch the property list after removal
        } catch (error) {
            console.error('Error removing property:', error);
        }
    };

    const handleFilterResults = (results) => {
        setFilterResults(results); // Update filter results from FilterModal
    };

    const resetForm = () => {
        setFormData({
            propertyName: '',
            propertyType: '',
            price: '',
            description: '',
            facilities: [],
        });
    };

    // Determine if any modal is open
    const isModalOpen = isAddModalOpen || isRemoveModalOpen;

    return (
        <div>
            {/* Wrap the content you want to blur */}
            <div className={isModalOpen ? 'blur' : ''}>
                <h2>Configure Properties</h2>

                <div className="button-container">
                    <div className="button-box">
                        <button onClick={() => setAddModalOpen(true)}>Add Property</button>
                        <button onClick={() => setRemoveModalOpen(true)}>Remove Property</button>
                    </div>
                </div>

                <h3>Existing Properties</h3>
                <PropertiesList
                    properties={properties}
                />
            </div>

            <AddPropertyModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                formData={formData}
                handleInputChange={handleInputChange}
                handleAddProperty={handleAddProperty}
            />

            <RemovePropertyModal
                isOpen={isRemoveModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                handleRemoveProperty={handleRemoveProperty}
            />
        </div>
    );
};

export default ConfigureProperties;
