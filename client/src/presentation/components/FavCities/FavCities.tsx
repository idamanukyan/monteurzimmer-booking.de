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

    const getPhotoUrl = (cityName: string) => {
        try {
            return require(`../../../assets/city/${cityName.toLowerCase()}.jpg`);
        } catch (err) {
            // Fallback image if the specific one is not found
            return require('../../../assets/city/berlin.jpg'); // Change to your fallback image
        }
    }


    return (
        <div className={styles.citiesGrid}>
            {favCities.map((city, index) => (
                <div className={styles.cityCard}
                     key={city.id}
                     style={{ backgroundImage: `url(${getPhotoUrl(city.name)})` }} // Use city.name here
                     onClick={() => navigate('/properties', { state: { searchInput: city.name } })}
                >
                    <div className={styles.overlay}>
                        <span className={styles.cityName}>{city.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavCities;
