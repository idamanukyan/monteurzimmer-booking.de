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
            console.error('Error fetching subscribers:', error);
        }
    };

    const fetchActiveSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/active-subscriptions');
            setActiveSubscriptions(response.data);
            setFilteredSubscriptions(response.data); // Set filtered subscriptions initially
        } catch (error) {
            console.error('Error fetching active subscriptions:', error);
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
            console.error('Error unsubscribing subscriber:', error);
        }
    };

    const handleSubscribe = async () => {
        setErrorMessage(''); // Clear previous error message
        try {
            const { email, name, surname, birthDate } = formData;
            await axios.post('http://localhost:8080/api/newsletter/subscribe', { email, name, surname, birthDate });
            fetchSubscribers(); // Refresh the subscribers list
            fetchActiveSubscriptions(); // Refresh active subscriptions list
            setFormData({ email: '', name: '', surname: '', birthDate: '' }); // Reset form data
        } catch (error) {
            console.error('Error subscribing:', error);
            setErrorMessage('Subscription failed. Please check your input.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Newsletter Management</h2>

            {/* Subscription Form */}
            <div>
                <h3>Subscribe</h3>
                <div className="form-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
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
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            {/* Subscribers List */}
            <h3>Existing Subscribers</h3>
            <div className="newsletter-management-container">
                <div className="subscribers-list">
                    {subscribers.map((subscriber) => (
                        <div key={subscriber.id} className="subscriber-card">
                            <h4>{subscriber.name} {subscriber.surname}</h4>
                            <p>Email: {subscriber.email}</p>
                            <p>Birth Date: {subscriber.birthDate}</p>
                            <p>Status: {subscriber.active ? 'Active' : 'Inactive'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Subscriptions List */}
            <h3>Active Subscriptions</h3>
            <input
                type="text"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="search-input"
            />
            <div className="active-subscriptions-list">
                <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSubscriptions.map((email, index) => (
                        <tr key={index}>
                            <td>{email}</td>
                            <td>
                                <button onClick={() => handleRemoveSubscriber(email)}>Unsubscribe</button>
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
