import React from 'react';
import './style/Header.css';
import adminIcon from '../pages/style/public/admin.svg';
import logoutIcon from '../pages/style/public/logout.svg';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Optionally redirect to login page or another page
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="header">
            <a href="/admin/dashboard" className="dashboard-title">
                <img src={adminIcon} alt="Admin Icon" className="admin-icon" />
                <h1 className="admin-title">Administrator-Dashboard</h1>
            </a>
            <a href="/logout" className="logout-button">
                <img src={logoutIcon} alt="Logout" className="logout-icon" />
                Ausloggen
            </a>
        </header>
    );
};

export default Header;
