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
    const [filterResults, setFilterResults] = useState({});
    const [formData, setFormData] = useState({
        propertyName: '',
        propertyType: '',
        price: '',
        description: '',
        facilities: [],
    });

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
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            facilities: Object.keys(filterResults).filter(key => filterResults[key]),
        };

        try {
            await axios.post('http://localhost:8080/api/properties', dataToSend);
            resetForm();
            setAddModalOpen(false);
            fetchProperties();
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const handleRemoveProperty = async (url) => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/remove/by/link`, { params: { url } });
            setRemoveModalOpen(false);
            fetchProperties();
        } catch (error) {
            console.error('Error removing property:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            propertyName: '',
            propertyType: '',
            price: '',
            description: '',
            facilities: [],
        });
        setFilterResults({});
    };

    // Determine if any modal is open
    const isModalOpen = isAddModalOpen || isRemoveModalOpen;

    return (
        <div>
            {/* Wrap the content you want to blur */}
            <div className={isModalOpen ? 'blur' : ''}>
                <h2>Konfigurieren von Eigenschaften</h2>

                <div className="button-container">
                    <div className="button-box">
                        <button onClick={() => setAddModalOpen(true)}>Hinzufügen </button>
                        <button onClick={() => setRemoveModalOpen(true)}>Entfernen</button>
                    </div>
                </div>

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
                filters={filterResults}
                setFilters={setFilterResults}
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
