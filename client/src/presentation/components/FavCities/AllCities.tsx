import React from 'react';
import styles from './FavCities.module.css';
import { FavCitiesModel } from "../../../data/model/FavCitiesModel";
import { useNavigate } from "react-router-dom";

interface FavCitiesProps {
    favCities: FavCitiesModel
}

const AllCities: React.FC<FavCitiesProps> = ({ favCities }) => {
    const navigate = useNavigate();


    // Limit the number of displayed cities to 9
    const displayedCities = favCities.slice(0, 49);

    return (
        <div className={styles.citiesContainer}>
            {displayedCities.map((city) => (
                <div
                    key={city.id}
                    className={styles.cityBox}
                    onClick={() => navigate('/properties', { state: { searchInput: city.name } })}
                >
                    <span className={styles.cityName}>
                        {city.name}
                    </span>
                </div>
            ))}
            {/* See More Button */}
            {favCities.length > 9 && (
                <button
                    className={styles.seeMoreButton}
                    onClick={() => navigate('/all-cities')} // Adjust the route to where you want to navigate
                >
                    See More
                </button>
            )}
        </div>
    );
};

export default AllCities;
