import React, { useState, useEffect } from 'react';
import styles from './FavProducts.module.css';

const images = [
    {
        src: '/assets/images/favProd1.jpeg',
        title: 'La Corniche Apartments GmbH "feel at home"',
        description: 'Ganze Unterkunft für 12 Personen ab 20,00 € pro Person',
    },
    {
        src: '/assets/images/favProd2.jpeg',
        title: 'Hevals City Appartments',
        description: 'Ganze Unterkünfte für jeweils 15 Personen ab 23,00 € pro Person',
    },
    {
        src: '/assets/images/favProd3.jpeg',
        title: 'Bussiness Apartment / Monteurzimmer',
        description: 'Ganze Unterkünfte für jeweils 28 Personen ab 30,00 € pro Person',
    },
];

const FavProducts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const goToNext = () => {
        setDirection('next');
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setDirection('prev');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={styles.slideshowContainer}>
            <div className={`${styles.slideshowImage} ${direction === 'prev' ? styles.slidePrev : direction === 'next' ? styles.slideNext : ''}`}>
                <img src={images[currentIndex].src} alt={images[currentIndex].title} />
            </div>
            <div className={styles.slideshowText}>
                <h2>{images[currentIndex].title}</h2>
                <p>{images[currentIndex].description}</p>
            </div>
            <div className={styles.navigation}>
                <button onClick={goToPrev} className={styles.navButton}>
                    &lt; {/* Previous arrow */}
                </button>
                <button onClick={goToNext} className={styles.navButton}>
                    &gt; {/* Next arrow */}
                </button>
            </div>
        </div>
    );
};

export default FavProducts;
