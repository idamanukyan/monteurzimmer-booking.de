import React, { useState } from 'react';
import styles from './SortBy.module.css';

interface SortByProps {
    onSort: (sortOption: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSortOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown
        onSort(option);   // Call the sorting function with the selected option
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.sortByContainer}>
            <button className={styles.sortByButton} onClick={toggleDropdown}>
                Sortieren nach {selectedOption ? `: ${selectedOption}` : ""}
                <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
            </button>

            {isOpen && (
                <div className={styles.sortOptions}>
                    <div onClick={() => handleSortOptionClick("Preis: Niedrig bis Hoch")}>
                        Preis: Niedrig bis Hoch
                    </div>
                    <div onClick={() => handleSortOptionClick("Preis: Hoch bis Niedrig")}>
                        Preis: Hoch bis Niedrig
                    </div>
                    <div onClick={() => handleSortOptionClick("Bewertung: Niedrig bis Hoch")}>
                        Bewertung: Niedrig bis Hoch
                    </div>
                    <div onClick={() => handleSortOptionClick("Bewertung: Hoch bis Niedrig")}>
                        Bewertung: Hoch bis Niedrig
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortBy;
