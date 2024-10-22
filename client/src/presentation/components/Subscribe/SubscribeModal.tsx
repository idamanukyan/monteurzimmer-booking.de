import React, { useState } from 'react';
import styles from './SubscribeModal.module.css';
import axios from 'axios';

interface SubscribeModalProps {
    closeModal: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ closeModal }) => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        message: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // For error messages

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
        setErrors({}); // Clear errors on input change
    };

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        // Name validation
        if (formState.name.trim() === '') {
            newErrors.name = 'Name ist erforderlich.';
        }

        // Email validation
        if (formState.email.trim() === '') {
            newErrors.email = 'E-Mail ist erforderlich.';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'E-Mail ist nicht gültig.';
        }

        // Date validation
        if (formState.date === '') {
            newErrors.date = 'Geburtsdatum ist erforderlich.';
        } else if (formState.date > today) {
            newErrors.date = 'Geburtsdatum darf nicht in der Zukunft liegen.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return; // Validate fields before submission

        try {
            const response = await axios.post('http://localhost:8080/api/newsletter/subscribe', formState);
            console.log(response.data);
            closeModal();
        } catch (err) {
            console.error('Fehler beim Abonnieren:', err);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Abonnieren Sie unseren Newsletter</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className={styles.inputField}
                            placeholder="Geben Sie Ihren Namen ein"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>} {/* Show name error */}
                    </label>
                    <label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={styles.inputField}
                            placeholder="Geben Sie Ihre E-Mail ein"
                        />
                        {errors.email && <div className={styles.error}>{errors.email}</div>} {/* Show email error */}
                    </label>
                    <label>
                        Geburtsdatum:
                        <input
                            type="date"
                            name="date"
                            value={formState.date}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {errors.date && <div className={styles.error}>{errors.date}</div>} {/* Show date error */}
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={closeModal} className={styles.cancelButton}>Abbrechen</button>
                        <button type="submit" className={styles.submitButton}>Jetzt abonnieren</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscribeModal;
