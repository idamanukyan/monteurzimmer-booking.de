import React from 'react';

const UpdatePropertyModal = ({ isOpen, onClose, formData, handleInputChange, handleUpdateProperty }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h3>Update Property</h3>
            <form onSubmit={handleUpdateProperty}>
                <input
                    type="text"
                    name="propertyName"
                    placeholder="Property Name"
                    value={formData.title}
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

                <button type="submit">Update Property</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default UpdatePropertyModal;
