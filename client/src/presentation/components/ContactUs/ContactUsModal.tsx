import React, { useState } from 'react';
import styles from './ContactUsModal.module.css';

interface ContactUsModalProps {
    closeModal: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ closeModal }) => {
    const [contactForm, setContactForm] = useState({
        userName: '',
        userPhone: '',
        userEmail: '',
        userDate: '',
        userMessage: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // For error messages

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
        setErrors({}); // Clear errors on input change
    };

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        // Name validation
        if (contactForm.userName.trim() === '') {
            newErrors.userName = 'Name ist erforderlich.';
        }

        // Phone validation
        if (contactForm.userPhone.trim() === '') {
            newErrors.userPhone = 'Telefonnummer ist erforderlich.';
        }

        // Email validation
        if (contactForm.userEmail.trim() === '') {
            newErrors.userEmail = 'E-Mail ist erforderlich.';
        } else if (!/\S+@\S+\.\S+/.test(contactForm.userEmail)) {
            newErrors.userEmail = 'E-Mail ist nicht gültig.';
        }

        // Date validation
        if (contactForm.userDate === '') {
            newErrors.userDate = 'Datum ist erforderlich.';
        } else if (contactForm.userDate > today) {
            newErrors.userDate = 'Datum darf nicht in der Zukunft liegen.';
        }

        // Message validation
        if (contactForm.userMessage.trim() === '') {
            newErrors.userMessage = 'Nachricht ist erforderlich.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return; // Validate fields before submission

        try {
            const response = await fetch('http://localhost:8080/api/contact/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactForm),
            });

            if (!response.ok) {
                throw new Error('Fehler beim Senden der E-Mail');
            }

            closeModal();
        } catch (error) {
            console.error('Fehler beim Senden der E-Mail:', error);
        }
    };

    return (
        <div className={styles.uniqueModalOverlay}>
            <div className={styles.uniqueModalContent}>
                <h2>Kontaktieren Sie uns</h2>
                <p>Einfach und schnell anfragen!</p>
                <p>Tel.: +49 1579 2492000</p>
                <p>Email: info@dkn-monteurzimmer.de</p>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.uniqueInputGroup}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="userName"
                                value={contactForm.userName}
                                onChange={handleInputChange}
                                className={styles.uniqueInputField}
                                placeholder="Ihr Name"
                            />
                            {errors.userName && <div className={styles.error}>{errors.userName}</div>} {/* Show name error */}
                        </label>
                        <label>
                            Telefon:
                            <input
                                type="tel"
                                name="userPhone"
                                value={contactForm.userPhone}
                                onChange={handleInputChange}
                                className={styles.uniqueInputField}
                                placeholder="Ihre Telefonnummer"
                            />
                            {errors.userPhone && <div className={styles.error}>{errors.userPhone}</div>} {/* Show phone error */}
                        </label>
                    </div>
                    <div className={styles.uniqueInputGroup}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="userEmail"
                                value={contactForm.userEmail}
                                onChange={handleInputChange}
                                className={styles.uniqueInputField}
                                placeholder="Ihre E-Mail-Adresse"
                            />
                            {errors.userEmail && <div className={styles.error}>{errors.userEmail}</div>} {/* Show email error */}
                        </label>
                        <label>
                            Datum:
                            <input
                                type="date"
                                name="userDate"
                                value={contactForm.userDate}
                                onChange={handleInputChange}
                                className={styles.uniqueInputField}
                            />
                            {errors.userDate && <div className={styles.error}>{errors.userDate}</div>} {/* Show date error */}
                        </label>
                    </div>
                    <label>
                        Nachricht:
                        <textarea
                            name="userMessage"
                            value={contactForm.userMessage}
                            onChange={handleInputChange}
                            className={styles.uniqueTextareaField}
                            placeholder="Ihre Nachricht"
                        />
                        {errors.userMessage && <div className={styles.error}>{errors.userMessage}</div>} {/* Show message error */}
                    </label>
                    <div className={styles.uniqueModalActions}>
                        <button type="button" onClick={closeModal} className={styles.uniqueCancelButton}>Stornieren</button>
                        <button type="submit" className={styles.uniqueSubmitButton}>Einreichen</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUsModal;
