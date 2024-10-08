import React, { useState } from 'react';
import './style/MainContainer.css';
import PropertiesList from './PropertiesList';
import TrafficChart from './TrafficChart';
import searchIcon from './style/public/search.svg';
import calendarIcon from './style/public/calendar.svg';

const MainContainer = () => {
    const today = new Date().toLocaleDateString();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="main-container">
            <div className="search-section">
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Suche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">
                        <img src={searchIcon} alt="Search" className="search-icon"/>
                    </button>
                </div>
                Zuletzt hinzugefügte Immobilien
                <div className="date-box">
                    <img src={calendarIcon} alt="Calendar" className="calendar-icon"/>
                    <span className="date-display">{today}</span>
                </div>
            </div>

            <div className="properties-list-container">
                <PropertiesList />
            </div>

            <div className="traffic-section">
                <h2>Website-Verkehr</h2>
                <TrafficChart />
            </div>
        </div>
    );
};

export default MainContainer;
