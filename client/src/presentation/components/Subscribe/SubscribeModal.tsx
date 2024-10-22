import React, { useState } from 'react';
import styles from './SubscribeModal.module.css';

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
        // Handle form submission logic here (e.g., API call)
        closeModal();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Subscribe to Our Newsletter</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                            placeholder="Enter your name" // Added placeholder
                        />
                    </label>
                    <label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                            placeholder="Enter your email" // Added placeholder
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="date"
                            value={formState.date}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </label>
                    <label>
                        <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            className={styles.textareaField}
                            placeholder="Enter your message" // Added placeholder
                        />
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={closeModal} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.submitButton}>Subscribe Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscribeModal;
