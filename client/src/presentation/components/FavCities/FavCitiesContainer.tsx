// src/presentation/components/FavCities/FavCitiesContainer.tsx
import React, { useEffect, useState } from 'react';
import { FavCitiesService } from '../../../data/service/FavCitiesService'; // Adjust the path as needed
import FavCities from './FavCities'; // Adjust the import path as needed
import { FavCitiesModel } from '../../../data/model/FavCitiesModel';

const FavCitiesContainer: React.FC = () => {
    const [favCities, setFavCities] = useState<FavCitiesModel | null>(null);
    const favCitiesService = new FavCitiesService();

    useEffect(() => {
        const fetchFavCities = async () => {
            const cities = await favCitiesService.getFavCities();
            setFavCities(cities);
        };
        fetchFavCities();
    }, []);

    if (!favCities) {
        return <div>Loading...</div>; // You can customize the loading state as needed
    }

    return <FavCities favCities={favCities} />;
};

export default FavCitiesContainer;
