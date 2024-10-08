import React, { useState } from 'react';
import styles from './SubscribeModal.module.css';
import {DateCalendar} from "@mui/x-date-pickers";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // handle form submission logic
        console.log(formState);
        closeModal();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Newsletter abonnieren und immer informiert sein</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formState.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formState.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Geburtsdatum:
                        <input type="date" name="Geburtsdatum" value={formState.date} onChange={handleChange} required />
                    </label>
                    <label>
                        Nachricht:
                        <textarea name="message" value={formState.message} onChange={handleChange} required />
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={closeModal}>Stornieren</button>
                        <button type="submit">Jetzt kostenlos anmelden</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscribeModal;
