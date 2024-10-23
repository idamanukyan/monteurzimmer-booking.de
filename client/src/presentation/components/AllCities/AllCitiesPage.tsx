import React, { useEffect, useState } from 'react';
import './AllCitiesPage.css'; // Ensure correct import
import { FavCitiesModel } from "../../../data/model/FavCitiesModel";
import { useNavigate } from "react-router-dom";
import { FavCitiesService } from '../../../data/service/FavCitiesService';
import Header from "../Header";
import Footer from "../Footer";

const AllCities: React.FC = () => {
    const [favCities, setFavCities] = useState<FavCitiesModel | null>(null);
    const [searchInput, setSearchInput] = useState<string>(''); // State for search input
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

    // Function to handle the search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    // Filter cities based on the search input
    const filteredCities = favCities.filter(city =>
        city.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="container">
            <Header />
            <h2 className="title">Alle Städte</h2> {/* Title for the cities section */}
            <input
                type="text"
                placeholder="Städte suchen..."
                value={searchInput}
                onChange={handleSearchChange}
                className="searchInput" // Add a class for styling
            />
            <div className="citiesContainer">
                {filteredCities.map((city) => (
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
            <Footer/>
        </div>
    );
};

export default AllCities;
