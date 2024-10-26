import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/NewsletterManagement.css';

const NewsletterControlPanel = () => {
    const [subscriberList, setSubscriberList] = useState([]);
    const [activeSubscriberList, setActiveSubscriberList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredActiveSubscribers, setFilteredActiveSubscribers] = useState([]);
    const [subscriptionData, setSubscriptionData] = useState({
        email: '',
        name: '',
        surname: '',
        birthDate: '',
    });
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const authToken = localStorage.getItem('access_token');

    useEffect(() => {
        fetchAllSubscribers();
        fetchActiveSubscriberList();
    }, []);

    useEffect(() => {
        setFilteredActiveSubscribers(
            activeSubscriberList.filter(subscriber =>
                subscriber.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, activeSubscriberList]);

    const fetchAllSubscribers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/all-subscriptions', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setSubscriberList(response.data);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchActiveSubscriberList = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/active-subscriptions', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setActiveSubscriberList(response.data);
            setFilteredActiveSubscribers(response.data);
        } catch (error) {
            console.error('Error fetching active subscriptions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnsubscribe = async (email) => {
        try {
            await axios.post('http://localhost:8080/api/newsletter/unsubscribe', null, {
                params: { email },
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            fetchAllSubscribers();
            fetchActiveSubscriberList();
        } catch (error) {
            console.error('Error unsubscribing the user:', error);
        }
    };

    const handleSubscribe = async () => {
        setNotificationMessage('');

        // Log subscription data to debug
        console.log('Subscription Data:', subscriptionData);

        if (!/\S+@\S+\.\S+/.test(subscriptionData.email)) {
            setNotificationMessage('Please enter a valid email address.');
            return;
        }

        try {
            const { email, name, surname, birthDate } = subscriptionData;
            await axios.post('http://localhost:8080/api/newsletter/subscribe', {
                email: email,
                name: name,
                surname: surname,
                birthDate: birthDate
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            fetchAllSubscribers();
            fetchActiveSubscriberList();
            setSubscriptionData({ email: '', name: '', surname: '', birthDate: '' });
        } catch (error) {
            console.error('Error during subscription:', error);
            setNotificationMessage('Subscription failed. Please check your input.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="newsletter-control-panel">
            <h2>Newsletter Control Panel</h2>
            <div>
                <h3>Subscribe</h3>
                <div className="newsletter-form-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email (e.g., max@example.com)"
                        value={subscriptionData.email}
                        onChange={handleInputChange}
                        required
                        className="newsletter-input newsletter-input-email"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={subscriptionData.name}
                        onChange={handleInputChange}
                        required
                        className="newsletter-input newsletter-input-text"
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Last Name"
                        value={subscriptionData.surname}
                        onChange={handleInputChange}
                        required
                        className="newsletter-input newsletter-input-text"
                    />
                    <input
                        type="date"
                        name="birthDate"
                        value={subscriptionData.birthDate}
                        onChange={handleInputChange}
                        required
                        className="newsletter-input newsletter-input-date"
                    />
                    <button onClick={handleSubscribe} className="newsletter-button">Subscribe</button>
                </div>
                {notificationMessage && <p style={{ color: 'red' }}>{notificationMessage}</p>}
            </div>

            <h3>Existing Subscribers</h3>
            <div className="newsletter-subscribers-list">
                {isLoading ? (
                    <p>Loading subscribers...</p>
                ) : (
                    subscriberList.map((subscriber) => (
                        <div key={subscriber.id} className="newsletter-subscriber-card">
                            <h4>{subscriber.name} {subscriber.surname}</h4>
                            <p>Email: {subscriber.email}</p>
                            <p>Birth Date: {subscriber.birthDate}</p>
                            <p>Status: {subscriber.active ? 'Active' : 'Inactive'}</p>
                        </div>
                    ))
                )}
            </div>

            <h3>Active Subscriptions</h3>
            <input
                type="text"
                placeholder="Search Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="newsletter-search-input"
            />
            <div className="newsletter-active-subscriptions-list">
                <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="2">Loading active subscriptions...</td>
                        </tr>
                    ) : (
                        filteredActiveSubscribers.map((email) => (
                            <tr key={email}>
                                <td>{email}</td>
                                <td>
                                    <button onClick={() => handleUnsubscribe(email)} className="newsletter-unsubscribe-button">Unsubscribe</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsletterControlPanel;
