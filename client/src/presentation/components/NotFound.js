// src/presentation/components/NotFound.js

import React from 'react';

const NotFound = () => {
    // Inline CSS styles
    const styles = {
        container: {
            textAlign: 'center',
            margin: '50px',
        },
        heading: {
            fontSize: '3rem',
            color: 'red',
        },
        subheading: {
            fontSize: '2rem',
        },
        paragraph: {
            fontSize: '1.2rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <h2 style={styles.subheading}>Page Not Found</h2>
            <p style={styles.paragraph}>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
