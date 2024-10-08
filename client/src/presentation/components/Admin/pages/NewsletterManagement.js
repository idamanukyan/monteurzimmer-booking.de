import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style/NewsletterManagement.css'; // Add your styles

const NewsletterManagement = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        name: '',
        surname: '',
        birthDate: '',
        subscribedAt: '',
        isActive: true,
    });
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/newsletter/active-subscriptions');
            setSubscribers(response.data);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({...formData, [name]: type === 'checkbox' ? checked : value});
    };

    const handleAddSubscriber = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/newsletter', formData);
            fetchSubscribers(); // Refresh the subscribers list
            setAddModalOpen(false); // Close the modal
            resetForm();
        } catch (error) {
            console.error('Error adding subscriber:', error);
        }
    };

    const handleUpdateSubscriber = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/newsletter/${formData.id}`, formData);
            fetchSubscribers(); // Refresh the subscribers list
            setUpdateModalOpen(false); // Close the modal
            resetForm();
        } catch (error) {
            console.error('Error updating subscriber:', error);
        }
    };

    const handleRemoveSubscriber = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/newsletter/${id}`);
            fetchSubscribers(); // Refresh the subscribers list
        } catch (error) {
            console.error('Error removing subscriber:', error);
        }
    };

    const openUpdateModal = (subscriber) => {
        setFormData(subscriber);
        setUpdateModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            id: '',
            email: '',
            name: '',
            surname: '',
            birthDate: '',
            subscribedAt: '',
            isActive: true,
        });
    };

    return (
        <div>
            <h2>Newsletter Management</h2>

            <button onClick={() => setAddModalOpen(true)}>Add Subscriber</button>

            {/* Add Subscriber Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <h3>Add Subscriber</h3>
                    <form onSubmit={handleAddSubscriber}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            Active
                        </label>
                        <button type="submit">Add Subscriber</button>
                        <button type="button" onClick={() => setAddModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Update Subscriber Modal */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <h3>Update Subscriber</h3>
                    <form onSubmit={handleUpdateSubscriber}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            Active
                        </label>
                        <button type="submit">Update Subscriber</button>
                        <button type="button" onClick={() => setUpdateModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            {/* Subscribers List */}
            <h3>Existing Subscribers</h3>
            <div className="subscribers-list">
                {subscribers.map((subscriber) => (
                    <div key={subscriber.id} className="subscriber-card">
                        <h4>{subscriber.name} {subscriber.surname}</h4>
                        <p>Email: {subscriber.email}</p>
                        <p>Birth Date: {subscriber.birthDate}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={subscriber.isActive}
                                readOnly
                            />
                            Active
                        </label>
                        <button onClick={() => openUpdateModal(subscriber)}>Update</button>
                        <button onClick={() => handleRemoveSubscriber(subscriber.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsletterManagement;
