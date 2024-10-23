import Header from "../../components/Header";
import LandingScreenModel from "./LandingScreenModel";
import HeroSlide from "../../components/HeroSlide";
import styles from './LandingScreen.module.css';
import CheapestProducts from "../../components/CheapestProducts/CheapestProducts";
import AboutUs from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer";
import FavCities from "../../components/FavCities/FavCities";
import {FavCitiesService} from "../../../data/service/FavCitiesService";
import {PropertyService} from "../../../data/service/PropertyService";
import React from "react";
import FavoriteProperties from "../../components/FavoriteProperties/FavoriteProperties";
import AllCities from "../../components/FavCities/AllCities";

export default function LandingScreen() {
    const {
        state,
        onRadiusSliderChange,
        onSearchTextChange,
        onSearchClick,
        onKeyPress
    } = LandingScreenModel(new FavCitiesService(), new PropertyService());

    return (
        <div>
            <div className={styles.heroSlideContainer}>
                <HeroSlide onSearchClick={onSearchClick}
                           onRadiusSliderChange={onRadiusSliderChange}
                           onSearchTextChange={onSearchTextChange}
                           onKeyPress={onKeyPress}/>
            </div>

            <div className={styles.favCitiesContainer}>
                <div className={styles.favTitle2}>Beliebte Städte</div>
                <hr className={styles.dividerLineFavoriteCities}/> {/* Corrected "Favortie" to "Favorite" */}
                <FavCities favCities={state.favCities}/>
            </div>

            <div className={styles.favProdsContainer}>
                <div className={styles.favTitle2}>Beliebte Unterkünfte</div> {/* Corrected "Unterkunfte" to "Unterkünfte" */}
                <hr className={styles.dividerLineFavoriteProperties}/>
                <FavoriteProperties favoriteProperties={state.favoriteProperties}/>
            </div>

            <div className={styles.favProdsContainer}>
                <div className={styles.favTitle2}>Top 20 der günstigsten Optionen</div>
                <hr className={styles.dividerLineCheapestProperties}/>
                <CheapestProducts cheapestProperties={state.cheapestProperties}/>
            </div>

            <div className={styles.allCitiesContainer}>
                <div className={styles.favTitle2}>Alle Städte</div>
                <hr className={styles.dividerLineFavoriteCities}/> {/* Corrected "Favortie" to "Favorite" */}
                <AllCities favCities={state.allCities}/>
            </div>

            <div className={styles.aboutUsContainer}>
                <div className={styles.aboutUsTitle}>CHECK-MONTEURZIMMER - Dein Partner für den besten Preis</div>
                <AboutUs/>
            </div>
            <div className={styles.footerContainer}>
                <Footer/>
            </div>
        </div>
    );
}
