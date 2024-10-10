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
                Sort By {selectedOption ? `: ${selectedOption}` : ""}
                <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
            </button>

            {isOpen && (
                <div className={styles.sortOptions}>
                    <div onClick={() => handleSortOptionClick("Price: Low to High")}>
                        Price: Low to High
                    </div>
                    <div onClick={() => handleSortOptionClick("Price: High to Low")}>
                        Price: High to Low
                    </div>
                    <div onClick={() => handleSortOptionClick("Rating: Low to High")}>
                        Rating: Low to High
                    </div>
                    <div onClick={() => handleSortOptionClick("Rating: High to Low")}>
                        Rating: High to Low
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortBy;
