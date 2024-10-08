import React, { useState } from 'react';
import styles from './ContactUsModal.module.css';
import {DateCalendar} from "@mui/x-date-pickers";

interface ContactUsModalProps {
    closeModal: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ closeModal }) => {
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
                <h2>Kontaktieren Sie uns</h2>
                <p>Einfach und schnell anfragen - Ihr individuelles Angebot wartet!</p>
                <p>Tel.: +49 1579 2492000</p>
                <p>Email: info@dkn-monteurzimmer.de</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formState.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Telefon:
                        <input type="tel" name="phone" value={formState.phone} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formState.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Datum:
                        <input type="date" name="date" value={formState.date} onChange={handleChange} required />
                    </label>
                    <label>
                        Nachricht:
                        <textarea name="message" value={formState.message} onChange={handleChange} required />
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={closeModal}>Stornieren</button>
                        <button type="submit">Einreichen</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUsModal;
