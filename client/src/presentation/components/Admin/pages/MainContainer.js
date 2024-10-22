import React, { useState } from 'react';
import './style/MainContainer.css';
import PropertiesList from './PropertiesList';
import TrafficChart from './TrafficChart';
import calendarIcon from './style/public/calendar.svg';

const MainContainer = () => {
    const today = new Date().toLocaleDateString();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
    };

    return (
        <main className="main-container">
            <header className="search-section">
                <h3>Zuletzt hinzugefügte Monteurzimmer</h3>
                <div className="date-box">
                    <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
                    <span className="date-display">{today}</span>
                </div>
            </header>

            <section className="properties-list-container">
                <PropertiesList />
            </section>
        </main>
    );
};

export default MainContainer;
