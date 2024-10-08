import React from 'react';

const AddPropertyModal = ({ isOpen, onClose, formData, handleInputChange, handleAddProperty }) => {
    if (!isOpen) return null;

    return (
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
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default AddPropertyModal;
