import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the API call to your sign-in endpoint
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

            // Save access and refresh tokens to local storage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            console.log('Navigating to /admin/dashboard'); // Add this line for debugging
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        } catch (err) {
            setError(err.message);
        }
        // Check in the console if token is correctly stored
        console.log(localStorage.getItem('access_token'));

    };

    return (
        <div className="login-container" style={{ textAlign: 'center', margin: '50px' }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email" // Email input for better user experience
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

    );
};

export default LoginPage;
