import React from 'react';
import styles from './FavCities.module.css';
import {PropertyMainFields} from "../../../data/model/PropertiesModel";
import {FavCitiesModel} from "../../../data/model/FavCitiesModel";
import {useNavigate} from "react-router-dom";

interface FavCitiesProps {
    favCities: FavCitiesModel
}

const FavCities: React.FC<FavCitiesProps> = ({ favCities }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.citiesGrid}>
            {favCities.map((city, index) => (
                <div className={styles.cityCard}
                     key={index}
                     style={{ backgroundImage: `url(${city.photo_url})` }}
                     onClick={() => navigate('/properties', { state: { searchInput: city.name } })
                     }>
                    <div className={styles.overlay}>
                        <span className={styles.cityName}>{city.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavCities;
