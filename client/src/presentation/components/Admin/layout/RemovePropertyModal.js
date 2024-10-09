import React, { useState } from 'react';

const RemovePropertyModal = ({ isOpen, onClose, handleRemoveProperty }) => {
    const [url, setUrl] = useState(''); // State to store the input URL

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRemoveProperty(url); // Call the remove function with the input URL
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Remove Property</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="url">Enter Property URL:</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter property URL to remove"
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Remove</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemovePropertyModal;
