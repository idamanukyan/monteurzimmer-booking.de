import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/NewsletterManagement.css';

const NewsletterManagement = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [activeSubscriptions, setActiveSubscriptions] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        birthDate: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchSubscribers();
        fetchActiveSubscriptions();
    }, []);

    useEffect(() => {
        setFilteredSubscriptions(
            activeSubscriptions.filter(subscription =>
                subscription.toLowerCase().includes(searchEmail.toLowerCase())
            )
        );
    }, [searchEmail, activeSubscriptions]);

    const fetchSubscribers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/all-subscriptions');
            setSubscribers(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Abonnenten:', error);
        }
    };

    const fetchActiveSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/active-subscriptions');
            setActiveSubscriptions(response.data);
            setFilteredSubscriptions(response.data); // Setze gefilterte Abonnements initial
        } catch (error) {
            console.error('Fehler beim Abrufen der aktiven Abonnements:', error);
        }
    };

    const handleRemoveSubscriber = async (email) => {
        try {
            await axios.post('http://localhost:8080/api/newsletter/unsubscribe', null, {
                params: { email }
            });
            fetchSubscribers();
            fetchActiveSubscriptions();
        } catch (error) {
            console.error('Fehler beim Abmelden des Abonnenten:', error);
        }
    };

    const handleSubscribe = async () => {
        setErrorMessage(''); // Vorherige Fehlermeldung löschen
        try {
            const { email, name, surname, birthDate } = formData;
            await axios.post('http://localhost:8080/api/newsletter/subscribe', { email, name, surname, birthDate });
            fetchSubscribers(); // Abonnentenliste aktualisieren
            fetchActiveSubscriptions(); // Aktive Abonnementsliste aktualisieren
            setFormData({ email: '', name: '', surname: '', birthDate: '' }); // Formulardaten zurücksetzen
        } catch (error) {
            console.error('Fehler beim Abonnieren:', error);
            setErrorMessage('Abonnement fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Newsletter-Verwaltung</h2>

            {/* Abonnement-Formular */}
            <div>
                <h3>Abonnieren</h3>
                <div className="form-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Vorname"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Nachname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                    <button onClick={handleSubscribe}>Abonnieren</button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            {/* Liste der Abonnenten */}
            <h3>Bestehende Abonnenten</h3>
            <div className="newsletter-management-container">
                <div className="subscribers-list">
                    {subscribers.map((subscriber) => (
                        <div key={subscriber.id} className="subscriber-card">
                            <h4>{subscriber.name} {subscriber.surname}</h4>
                            <p>E-Mail: {subscriber.email}</p>
                            <p>Geburtsdatum: {subscriber.birthDate}</p>
                            <p>Status: {subscriber.active ? 'Aktiv' : 'Inaktiv'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Liste der aktiven Abonnements */}
            <h3>Aktive Abonnements</h3>
            <input
                type="text"
                placeholder="E-Mail suchen"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="search-input"
            />
            <div className="active-subscriptions-list">
                <table>
                    <thead>
                    <tr>
                        <th>E-Mail</th>
                        <th>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSubscriptions.map((email, index) => (
                        <tr key={index}>
                            <td>{email}</td>
                            <td>
                                <button onClick={() => handleRemoveSubscriber(email)}>Abmelden</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsletterManagement;
