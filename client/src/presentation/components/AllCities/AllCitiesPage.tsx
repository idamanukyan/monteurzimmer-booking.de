import React, { useEffect, useState } from 'react';
import './AllCitiesPage.css'; // Ensure correct import
import { FavCitiesModel } from "../../../data/model/FavCitiesModel";
import { useNavigate } from "react-router-dom";
import { FavCitiesService } from '../../../data/service/FavCitiesService';
import Header from "../Header";

const AllCities: React.FC = () => {
    const [favCities, setFavCities] = useState<FavCitiesModel | null>(null);
    const navigate = useNavigate();
    const favCitiesService = new FavCitiesService();

    useEffect(() => {
        const fetchCities = async () => {
            const cities = await favCitiesService.getAllCities();
            setFavCities(cities);
        };

        fetchCities();
    }, []);

    if (!favCities) {
        return <div>Loading...</div>; // You can customize the loading state
    }

    return (
        <div className="container">
            <Header />
            <h2 className="title">Alle Städte</h2> {/* Title for the cities section */}
            <div className="citiesContainer">
                {favCities.map((city) => (
                    <div
                        key={city.id}
                        className="cityBox" // Use plain class names
                        onClick={() => navigate('/properties', { state: { searchInput: city.name } })}
                    >
                        <span className="cityName">
                            {city.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCities;
