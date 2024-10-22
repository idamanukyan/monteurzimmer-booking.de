import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/FormSubmission.css'; // Ensure this CSS file exists for styling

const FormSubmission = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of logs per page

    const fetchForms = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/all-forms`);
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    if (!forms || forms.length === 0) {
        return <p>No forms available</p>;
    }

    const totalPages = Math.ceil(forms.length / pageSize);

    // Get the forms for the current page
    const currentForms = forms.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="forms-page">
            <h2 className="forms-title">Formularübersicht</h2>
            <div className="forms-list">
                {currentForms.length > 0 ? (
                    currentForms.map((form) => (
                        <div key={form.id} className="form-item">
                            <div className="form-header">
                                <h3>{form.userName}</h3>
                                <p className="form-date">{new Date(form.userDate).toLocaleDateString()}</p>
                            </div>
                            <p><strong>Telefon:</strong> {form.userPhone}</p>
                            <p><strong>Email:</strong> {form.userEmail}</p>
                            <p><strong>Nachricht:</strong> {form.userMessage}</p>
                        </div>
                    ))
                ) : (
                    <p>No forms available.</p>
                )}
            </div>
            {/* Pagination controls */}
            <div className="pagination-controls">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Zurück
                </button>
                <span className="pagination-info">
                    Seite {currentPage} von {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default FormSubmission;
