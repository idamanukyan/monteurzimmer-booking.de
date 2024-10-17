import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            console.log('Navigating to /admin/dashboard'); // Debugging line
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        } catch (err) {
            setError(err.message);
        }

        console.log(localStorage.getItem('access_token')); // Check token storage
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
