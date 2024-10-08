import React from 'react';

const RemovePropertyModal = ({ isOpen, onClose, propertyName, handleRemoveProperty }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h3>Remove Property</h3>
            <p>Are you sure you want to remove {propertyName}?</p>
            <button onClick={handleRemoveProperty}>Yes, Remove</button>
            <button type="button" onClick={onClose}>Close</button>
        </div>
    );
};

export default RemovePropertyModal;
