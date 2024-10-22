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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        closeModal();
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
                                required
                                className={styles.uniqueInputField}
                                placeholder="Ihr Name"
                            />
                        </label>
                        <label>
                            Telefon:
                            <input
                                type="tel"
                                name="userPhone"
                                value={contactForm.userPhone}
                                onChange={handleInputChange}
                                required
                                className={styles.uniqueInputField}
                                placeholder="Ihre Telefonnummer"
                            />
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
                                required
                                className={styles.uniqueInputField}
                                placeholder="Ihre E-Mail-Adresse"
                            />
                        </label>
                        <label>
                            Datum:
                            <input
                                type="date"
                                name="userDate"
                                value={contactForm.userDate}
                                onChange={handleInputChange}
                                required
                                className={styles.uniqueInputField}
                            />
                        </label>
                    </div>
                    <label>
                        Nachricht:
                        <textarea
                            name="userMessage"
                            value={contactForm.userMessage}
                            onChange={handleInputChange}
                            required
                            className={styles.uniqueTextareaField}
                            placeholder="Ihre Nachricht"
                        />
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
