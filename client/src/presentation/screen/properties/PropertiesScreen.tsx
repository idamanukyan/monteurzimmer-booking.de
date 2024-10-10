import Header from "../../components/Header";
import PropertiesScreenModel from "./PropertiesScreenModel"
import styles from './PropertiesScreen.module.css';
import Footer from "../../components/Footer";
import FavCities from "../../components/FavCities/FavCities";
import {PropertyService} from "../../../data/service/PropertyService";
import PropertyCell from "./PropertyCellView";

export default function PropertiesScreen() {
    const {
        state
    } = PropertiesScreenModel(new PropertyService());
    // console.log(state.properties)

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <div className={styles.headerContainer}>
                <Header/>
            </div>
            <div className={styles.propertyScreenContainer}>
                <div className={styles.propertyBodyContainer}>
                    <div className={styles.propertyFilterContainer}>
                        <h2>Filtern nach:</h2>
                        {/* Popular Filters */}
                        <div className={styles.filterCategory}>
                            <h4>Beliebte Filter</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="available" name="available"/>
                                <label htmlFor="available">Available</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="ruhigeLage" name="ruhigeLage"/>
                                <label htmlFor="ruhigeLage">Ruhige Lage</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="guteVerkehrsanbindung" name="guteVerkehrsanbindung"/>
                                <label htmlFor="guteVerkehrsanbindung">Gute Verkehrsanbindung</label>
                            </div>
                        </div>

                        {/* Room Facilities */}
                        <div className={styles.filterCategory}>
                            <h4>Zimmerausstattung</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="wlan" name="wlan"/>
                                <label htmlFor="wlan">Wlan</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="tv" name="tv"/>
                                <label htmlFor="tv">TV</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="kochmoglichkeit" name="kochmoglichkeit"/>
                                <label htmlFor="kochmoglichkeit">Kochmöglichkeit</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="kaffeemaschine" name="kaffeemaschine"/>
                                <label htmlFor="kaffeemaschine">Kaffeemaschine</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="mikrowelle" name="mikrowelle"/>
                                <label htmlFor="mikrowelle">Mikrowelle</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="kuhlschrank" name="kuhlschrank"/>
                                <label htmlFor="kuhlschrank">Kühlschrank</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="spulmaschine" name="spulmaschine"/>
                                <label htmlFor="spulmaschine">Spülmaschine</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="badewanne" name="badewanne"/>
                                <label htmlFor="badewanne">Badewanne</label>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div className={styles.filterCategory}>
                            <h4>Zugänglichkeit</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="raucher" name="raucher"/>
                                <label htmlFor="raucher">Raucher</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="eigenstandigerCheckIn" name="eigenstandigerCheckIn"/>
                                <label htmlFor="eigenstandigerCheckIn">Eigenständiger Check-In</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="getrennteBetten" name="getrennteBetten"/>
                                <label htmlFor="getrennteBetten">Getrennte Betten</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="privatesBad" name="privatesBad"/>
                                <label htmlFor="privatesBad">Privates Bad</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="zustellbettMoglich" name="zustellbettMoglich"/>
                                <label htmlFor="zustellbettMoglich">Zustellbett Möglich</label>
                            </div>
                        </div>

                        {/* General */}
                        <div className={styles.filterCategory}>
                            <h4>Allgemein</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="radio" name="radio"/>
                                <label htmlFor="radio">Radio</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="handtucherInkl" name="handtucherInkl"/>
                                <label htmlFor="handtucherInkl">Handtücher Inkl.</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="bettwascheInkl" name="bettwascheInkl"/>
                                <label htmlFor="bettwascheInkl">Bettwäsche Inkl.</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="wasserkocher" name="wasserkocher"/>
                                <label htmlFor="wasserkocher">Wasserkocher</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="garten" name="garten"/>
                                <label htmlFor="garten">Garten</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="terrasse" name="terrasse"/>
                                <label htmlFor="terrasse">Terrasse</label>
                            </div>
                        </div>

                        {/* Room Details */}
                        <div className={styles.filterCategory}>
                            <h4>Zimmerdetails</h4>
                            <div className={styles.filterItem}>
                                <label htmlFor="roomCount">Room Count:</label>
                                <input type="number" id="roomCount" name="roomCount"/>
                            </div>
                            <div className={styles.filterItem}>
                                <label htmlFor="bedCount">Bed Count:</label>
                                <input type="number" id="bedCount" name="bedCount"/>
                            </div>
                            <div className={styles.filterItem}>
                                <label htmlFor="bathrooms">Bathrooms:</label>
                                <input type="number" id="bathrooms" name="bathrooms"/>
                            </div>
                            <div className={styles.filterItem}>
                                <label htmlFor="numberOfGuests">Number of Guests:</label>
                                <input type="number" id="numberOfGuests" name="numberOfGuests"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.propertyListContainer}>
                        <h2>Search result for {state.city}</h2>
                        <div className={styles.propertyContainer}>
                            {(state.properties && state.propertiesMainFields) && state.properties.map((property, index) => (
                                state.propertiesMainFields[index] && (
                                    <PropertyCell
                                        key={index}
                                        title={state.propertiesMainFields[index].title}
                                        description={state.propertiesMainFields[index].description}
                                        image={state.propertiesMainFields[index].image}
                                        price={property.price}
                                        link={property.socialMediaLink}
                                        propertyType={property.propertyType}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerContainer}>
                <Footer/>
            </div>
        </div>
    )
}