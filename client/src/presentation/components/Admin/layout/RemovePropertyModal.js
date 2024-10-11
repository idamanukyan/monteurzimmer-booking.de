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
                <h2>Eigenschaft entfernen</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="url">Geben Sie die URL der Immobilie ein:</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Geben Sie die URL der zu entfernenden Eigenschaft ein"
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Entfernen</button>
                        <button type="button" onClick={onClose}>Stornieren</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemovePropertyModal;
