import React, { useState } from 'react';
import axios from 'axios';
import './style/ConfigureProperties.css';
import PropertiesList from './PropertiesList';
import AddPropertyModal from '../layout/AddPropertyModal';
import UpdatePropertyModal from '../layout/UpdatePropertyModal';
import RemovePropertyModal from '../layout/RemovePropertyModal';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/properties', formData);
            setFormData({ propertyName: '', propertyType: '', pricePerNight: '', description: '' });
            setAddModalOpen(false);
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const handleUpdateProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/properties/${selectedProperty.propertyId}`, formData);
            setFormData({ propertyName: '', propertyType: '', pricePerNight: '', description: '' });
            setUpdateModalOpen(false);
            setSelectedProperty(null);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleRemoveProperty = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/${selectedProperty.propertyId}`);
            setRemoveModalOpen(false);
            setSelectedProperty(null);
        } catch (error) {
            console.error('Error removing property:', error);
        }
    };

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

            <div className="button-container">
                <div className="button-box">
                    <button onClick={() => setAddModalOpen(true)}>Add Property</button>
                </div>
                <div className="button-box">
                    <button onClick={() => setUpdateModalOpen(true)}>Update Property</button>
                </div>
                <div className="button-box">
                    <button onClick={() => setRemoveModalOpen(true)}>Remove Property</button>
                </div>
            </div>

            <AddPropertyModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                formData={formData}
                handleInputChange={handleInputChange}
                handleAddProperty={handleAddProperty}
            />

            <UpdatePropertyModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                formData={formData}
                handleInputChange={handleInputChange}
                handleUpdateProperty={handleUpdateProperty}
            />

            <RemovePropertyModal
                isOpen={isRemoveModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                propertyName={selectedProperty?.propertyName}
                handleRemoveProperty={handleRemoveProperty}
            />

            <h3>Existing Properties</h3>
            <PropertiesList openUpdateModal={openUpdateModal} setRemoveModalOpen={setRemoveModalOpen} setSelectedProperty={setSelectedProperty} />
        </div>
    );
};

export default ConfigureProperties;
