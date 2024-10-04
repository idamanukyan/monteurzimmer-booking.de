import React, {ChangeEvent} from 'react';
import styles from './HeroSlide.module.css';
import SearchBox from "../SearchBox/SearchBox";

interface HeroSlideProps {
    onSearchClick: () => void;
    onSearchTextChange: (changeEvent: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputValue?: string
}

const HeroSlide: React.FC<HeroSlideProps> = ({ onSearchClick, onSearchTextChange, onKeyPress, inputValue }) => {
    return (
        <div className={styles.heroSlide}>
            <div className={styles.motto}>
                <span>Dein Partner für den besten Preis</span>
            </div>
            <SearchBox
                onSearchClick={onSearchClick}
                onSearchTextChange={onSearchTextChange}
                onKeyPress={onKeyPress}
                inputValue={inputValue}
            />
        </div>
    );
};

export default HeroSlide;
