import React, {ChangeEvent, useState} from 'react';
import styles from './HeroSlide.module.css';
import Box from '@mui/material/Box';
import Header from "../Header";
import "@mui/material/Slider";
import {Slider} from "@mui/material";

interface HeroSlideProps {
    onSearchClick: () => void;
    onRadiusSliderChange: (event: Event, newValue: number | number[]) => void;
    onSearchTextChange: (changeEvent: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputValue?: string
}

const HeroSlide: React.FC<HeroSlideProps> = ({ onSearchClick, onRadiusSliderChange, onSearchTextChange, onKeyPress, inputValue }) => {
    // const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);
    const [radiusValue, setRadiusValue] = useState(50);
    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setRadiusValue(newValue as number);
        onRadiusSliderChange(event, newValue);
    };

    return (
        <div className={styles.heroSlide}>
            <div className={styles.headerContainer}>
                <Header/>
            </div>
            <div className={styles.heroSlideDetails}>
                <div className={styles.motto}>
                    <p>Dein Partner für</p>
                    <p>den besten Preis</p>
                </div>
                <div className={styles.searchContainer}>
                    <div>
                        <h1>Explore properties</h1>
                        <hr className={styles.dividerLine}/>
                        <div className={styles.inputFields}>
                            <div>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder=" "
                                    onChange={onSearchTextChange}
                                    onKeyDown={onKeyPress}
                                    value={inputValue}
                                />
                                <label htmlFor="searchCity" className={styles.label}>
                                    Name der Stadt
                                </label>
                            </div>

                            <div>
                                <input
                                    type="number"
                                    className={styles.searchInput}
                                    placeholder=" "
                                    onChange={onSearchTextChange}
                                    onKeyDown={onKeyPress}
                                    value={inputValue}
                                />
                                <label htmlFor="searchGuest" className={styles.label}>
                                    Anzahl der Gäste
                                </label>
                            </div>

                            <div>
                                <div className={styles.dropdown}>
                                    <select id="accommodationType"
                                            name="accommodationType"
                                            className={styles.dropdownSelect}
                                            value={selectedType}
                                            onChange={handleTypeChange}
                                    >
                                        <option value="">Unterkunftstyp</option>
                                        <option value="Gästezimmer">Gästezimmer</option>
                                        <option value="Haus">Haus</option>
                                        <option value="Wohnung">Wohnung</option>
                                        <option value="Pension">Pension</option>
                                        <option value="Herberge">Herberge</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Andere">Andere</option>
                                    </select>
                                </div>
                            </div>

                            <Box sx={{width: 200}}>
                                <p className={styles.sliderText}>Suchradius</p>
                                <Slider
                                    value={radiusValue}
                                    onChange={handleSliderChange}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    color="success"
                                    className={styles.sliderText}
                                />
                            </Box>

                            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                            {/*    <div className={styles.datePicker}>*/}
                            {/*        <DatePicker*/}
                            {/*            label="Start"*/}
                            {/*            value={startDate}*/}
                            {/*            onChange={(newValue) => setStartDate(newValue)}*/}
                            {/*        />*/}
                            {/*        <DatePicker*/}
                            {/*            label="End"*/}
                            {/*            value={endDate}*/}
                            {/*            onChange={(newValue) => setEndDate(newValue)}*/}
                            {/*            minDate={startDate || undefined}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</LocalizationProvider>*/}
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={onSearchClick}
                            className={styles.searchButton}
                        >
                            Search Property
                            <span className={styles.arrowIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                     viewBox="0 0 16 16">
                                  <path fillRule="evenodd"
                                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 8 8.146 10.146a.5.5 0 0 0 .708.708l3-3z"/>
                                        <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6z"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
