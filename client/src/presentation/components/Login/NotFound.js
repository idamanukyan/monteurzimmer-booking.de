// src/presentation/components/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            margin: '0',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
        },
        heading: {
            fontSize: '5rem',
            color: '#dc3545',
            margin: '0',
        },
        subheading: {
            fontSize: '2rem',
            color: '#6c757d',
            margin: '10px 0',
        },
        paragraph: {
            fontSize: '1.2rem',
            color: '#495057',
            margin: '10px 0',
        },
        link: {
            marginTop: '20px',
            fontSize: '1.1rem',
            color: '#007bff',
            textDecoration: 'none',
            border: '1px solid #007bff',
            padding: '10px 20px',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s',
        },
        linkHover: {
            backgroundColor: '#007bff',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <h2 style={styles.subheading}>Page Not Found</h2>
            <p style={styles.paragraph}>The page you are looking for does not exist or has been moved.</p>
            <Link
                to="/"
                style={styles.link}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
                Go to Main Page
            </Link>
        </div>
    );
};

export default NotFound;
