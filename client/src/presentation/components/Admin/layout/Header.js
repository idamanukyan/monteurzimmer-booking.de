import React from 'react';
import './style/Header.css';
import adminIcon from '../pages/style/public/admin.svg';
import logoutIcon from '../pages/style/public/logout.svg';

const Header = () => {
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
