import Header from "../../components/Header";
import PropertiesScreenModel from "./PropertiesScreenModel"
import HeroSlide from "../../components/HeroSlide";
import styles from './PropertiesScreen.module.css';
import FavProducts from "../../components/FavProducts/FavProducts";
import AboutUs from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer";
import FavCities from "../../components/FavCities/FavCities";
import {FavCitiesService} from "../../../data/service/FavCitiesService";

export default function PropertiesScreen() {
    const {
        state,
        onSearchTextChange,
        onSearchClick,
        onKeyPress
    } = PropertiesScreenModel(new FavCitiesService());

    return (
        <div>
            <div className={styles.headerContainer}>
                <Header/>
            </div>
            <div className={styles.heroSlideContainer}>
                <HeroSlide onSearchClick={onSearchClick} onSearchTextChange={onSearchTextChange}
                           onKeyPress={onKeyPress}/>
            </div>
            <div className={styles.favProdsContainer}>
                <div className={styles.favTitle}>____________________</div>
                <div className={styles.favTitle2}>Ongoing Hot Deals</div>
                <FavProducts/>
            </div>
            <div className={styles.favCitiesContainer}>
                <div className={styles.favTitle}>____________________</div>
                <div className={styles.favCityTitle}>Favorite Cities</div>
                <FavCities/>
            </div>
            <div className={styles.aboutUsContainer}>
                <div className={styles.aboutUsTitle}>CHECK-MONTEURZIMMER - Dein Partner für den besten Preis</div>
                <AboutUs/>
            </div>
            <div className={styles.footerContainer}>
                <Footer/>
            </div>
        </div>
    )
}
