import React from 'react';
import styles from './FavCities.module.css';

const FavCities = () => {
    const cities = [
        { name: 'Berlin', image: 'assets/images/favCities/berlin.jpeg' },
        { name: 'Köln', image: 'assets/images/favCities/koln.jpeg' },
        { name: 'Dortmund', image: 'assets/images/favCities/dortmund.jpeg' },
        { name: 'Essen', image: 'assets/images/favCities/essen.jpeg' },
        { name: 'Hamburg', image: 'assets/images/favCities/hamburg.jpeg' },
        { name: 'Hannover', image: 'assets/images/favCities/hannover.jpeg' },
        { name: 'Leipzig', image: 'assets/images/favCities/leipzig.jpeg' },
        { name: 'München', image: 'assets/images/favCities/munchen.jpeg' },
        { name: 'Nürnberg', image: 'assets/images/favCities/nurnberg.jpeg' },
        { name: 'Stuttgart', image: 'assets/images/favCities/stuttgart.jpeg' },
    ];

    return (
        <div className={styles.citiesGrid}>
            {cities.map((city, index) => (
                <div className={styles.cityCard} key={index} style={{ backgroundImage: `url(${city.image})` }}>
                    <div className={styles.overlay}>
                        <span className={styles.cityName}>{city.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavCities;
