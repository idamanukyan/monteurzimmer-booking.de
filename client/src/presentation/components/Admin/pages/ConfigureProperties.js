import React, { useState, useEffect } from 'react';
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
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        propertyName: '',
        propertyType: '',
        price: '',
        description: '',
        facilities: [], // Initialize from filters if needed
    });

    const [filterResults, setFilterResults] = useState([]); // New state for filter results

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/properties');
                setProperties(response.data || []); // Ensure it's always an array
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

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
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    const handleUpdateProperty = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/properties/${selectedPropertyId}`, formData);
            resetForm();
            setUpdateModalOpen(false);
            setSelectedPropertyId(null);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleRemoveProperty = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/${selectedPropertyId}`);
            setRemoveModalOpen(false);
            setSelectedPropertyId(null);
        } catch (error) {
            console.error('Error removing property:', error);
        }
    };

/*    const openUpdateModal = (property) => {
        setSelectedPropertyId(property.id);
        setFormData({
            propertyName: property.propertyName,
            propertyType: property.propertyType,
            price: property.price,
            description: property.description,
            facilities: property.facilities || [], // Include facilities if necessary
        });
        setUpdateModalOpen(true);
    };*/

    const resetForm = () => {
        setFormData({
            propertyName: '',
            propertyType: '',
            price: '',
            description: '',
            facilities: [],
        });
    };

    const handleFilterResults = (results) => {
        setFilterResults(results); // Update filter results from FilterModal
    };

    // Determine if any modal is open
    const isModalOpen = isAddModalOpen || isUpdateModalOpen || isRemoveModalOpen;

    return (
        <div>
            {/* Wrap the content you want to blur */}
            <div className={isModalOpen ? 'blur' : ''}>
                <h2>Configure Properties</h2>

                <div className="button-container">
                    <div className="button-box">
                        <button onClick={() => setAddModalOpen(true)}>Add Property</button>
                    </div>
                    <div className="button-box">
                        <select
                            onChange={(e) => setSelectedPropertyId(e.target.value)}
                            value={selectedPropertyId || ""}
                        >
                            <option value="" disabled>Select a property to update</option>
                            {properties.map((property) => (
                                <option key={property.id} value={property.id}>
                                    {property.propertyName}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setUpdateModalOpen(true)} disabled={!selectedPropertyId}>
                            Update Property
                        </button>
                    </div>
                    <div className="button-box">
                        <select
                            onChange={(e) => setSelectedPropertyId(e.target.value)}
                            value={selectedPropertyId || ""}
                        >
                            <option value="" disabled>Select a property to remove</option>
                            {properties.map((property) => (
                                <option key={property.id} value={property.id}>
                                    {property.propertyName}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setRemoveModalOpen(true)} disabled={!selectedPropertyId}>
                            Remove Property
                        </button>
                    </div>
                </div>

                <h3>Existing Properties</h3>
             {/*   <PropertiesList
                    properties={properties}
                    openUpdateModal={openUpdateModal}
                />*/}
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
                propertyName={properties.find(property => property.id === selectedPropertyId)?.propertyName || 'N/A'}
                handleRemoveProperty={handleRemoveProperty}
            />
        </div>
    );
};

export default ConfigureProperties;
