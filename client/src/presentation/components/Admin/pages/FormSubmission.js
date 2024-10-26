import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/FormSubmission.css';

const FormSubmission = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchForms = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`http://localhost:8080/api/contact/all-forms`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    if (!forms || forms.length === 0) {
        return <p className="no-forms-message">No forms available</p>;
    }

    const totalPages = Math.ceil(forms.length / pageSize);
    const currentForms = forms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        <div className="form-submission-page">
            <h2 className="form-submission-title">Formularübersicht</h2>
            <div className="form-submission-list">
                {currentForms.length > 0 ? (
                    currentForms.map((form) => (
                        <div key={form.id} className="form-submission-item">
                            <div className="form-submission-header">
                                <h3>{form.userName}</h3>
                                <p className="form-submission-date">{new Date(form.userDate).toLocaleDateString()}</p>
                            </div>
                            <p><strong>Telefon:</strong> {form.userPhone}</p>
                            <p><strong>Email:</strong> {form.userEmail}</p>
                            <p><strong>Nachricht:</strong> {form.userMessage}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-forms-message">No forms available.</p>
                )}
            </div>
            <div className="form-submission-pagination-controls">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="form-submission-pagination-button"
                >
                    Zurück
                </button>
                <span className="form-submission-pagination-info">
                    Seite {currentPage} von {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="form-submission-pagination-button"
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default FormSubmission;
