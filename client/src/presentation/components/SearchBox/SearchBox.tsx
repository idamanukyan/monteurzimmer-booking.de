import React, {ChangeEvent} from 'react';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
    onSearchClick: () => void;
    onSearchTextChange: (changeEvent: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputValue?: string
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearchClick, onSearchTextChange, onKeyPress, inputValue }) => {
    return (
        <div className={styles.searchBox}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder=" "
                onChange={onSearchTextChange}
                onKeyDown={onKeyPress}
                value={inputValue}
            />
            <label htmlFor="searchCity" className={styles.label}>
                City, country, etc.
            </label>
            <button className={styles.searchButton} onClick={onSearchClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.searchIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ea5e47"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
            </button>
        </div>
    );
};

export default SearchBox;
