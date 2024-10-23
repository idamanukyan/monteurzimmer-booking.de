import Header from "../../components/Header";
import PropertiesScreenModel from "./PropertiesScreenModel"
import styles from './PropertiesScreen.module.css';
import Footer from "../../components/Footer";
import {PropertyService} from "../../../data/service/PropertyService";
import PropertyCellView from "./PropertyCellView";
import SortBy from "../../components/SortBy/SortBy";

export default function PropertiesScreen() {
    const {
        state,
        setState,
        onCheckboxChange
    } = PropertiesScreenModel(new PropertyService());

    const truncateDescription = (description: string, maxLength = 500) => {
        if (!description) return '';  // Check if description is empty
        return description.length > maxLength
            ? description.slice(0, maxLength) + '...'
            : description;  // Append "..." only if truncated
    };

    const sortProperties = (option: string) => {
        let sortedProperties = [...(state.filteredProperties || [])];

        switch (option) {
            case "Preis: Niedrig bis Hoch":
                sortedProperties.sort((a, b) => a.price - b.price);
                break;
            case "Preis: Hoch bis Niedrig":
                sortedProperties.sort((a, b) => b.price - a.price);
                break;
            case "Bewertung: Niedrig bis Hoch":
                sortedProperties.sort((a, b) => a.rating - b.rating);
                break;
            case "Bewertung: Hoch bis Niedrig":
                sortedProperties.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setState((prevState) => ({
            ...prevState,
            filteredProperties: sortedProperties
        }));
    };

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
                            <div className={styles.filterItemText}>
                                <input type="text" id="roomCount" name="roomCount"
                                       placeholder={"Anzahl der Zimmer"} onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                            </div>
                            <div className={styles.filterItemText}>
                                <input type="text" id="bedcount" name="bedcount"
                                       placeholder={"Bettenzahl"}
                                       onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                            </div>
                            <div className={styles.filterItemText}>
                                <input type="text" id="bathrooms" name="bathrooms"
                                       placeholder={"Badezimmer"}
                                       onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                            </div>
                            <div className={styles.filterItemText}>
                                <input type="text" id="numberofGuests" name="numberofGuests"
                                       placeholder={"Anzahl der Gäste"}
                                       onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="quietLocation" name="quietLocation"
                                       onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                                <label htmlFor="quietLocation">Ruhige Lage</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="goodTransportation" name="goodTransportation"
                                       onChange={onCheckboxChange} checked={state.goodTransportation || false}/>
                                <label htmlFor="goodTransportation">Guter Transport</label>
                            </div>
                        </div>

                        {/* Room Facilities */}
                        <div className={styles.filterCategory}>
                            <h4>Zimmerausstattungen</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="wifi" name="wifi" onChange={onCheckboxChange}
                                       checked={state.wifi || false}/>
                                <label htmlFor="wifi">WLAN</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="tv" name="tv" onChange={onCheckboxChange}
                                       checked={state.tv || false}/>
                                <label htmlFor="tv">TV</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="cookingFacilities" name="cookingFacilities"
                                       onChange={onCheckboxChange} checked={state.cookingFacilities || false}/>
                                <label htmlFor="cookingFacilities">Kochmöglichkeiten</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="coffeeMachine" name="coffeeMachine"
                                       onChange={onCheckboxChange} checked={state.coffeeMachine || false}/>
                                <label htmlFor="coffeeMachine">Kaffeemaschine</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="microwave" name="microwave" onChange={onCheckboxChange}
                                       checked={state.microwave || false}/>
                                <label htmlFor="microwave">Mikrowelle</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="fridge" name="fridge" onChange={onCheckboxChange}
                                       checked={state.fridge || false}/>
                                <label htmlFor="fridge">Kühlschrank</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="dishwasher" name="dishwasher" onChange={onCheckboxChange}
                                       checked={state.dishwasher || false}/>
                                <label htmlFor="dishwasher">Geschirrspüler</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="bathtub" name="bathtub" onChange={onCheckboxChange}
                                       checked={state.bathtub || false}/>
                                <label htmlFor="bathtub">Badewanne</label>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div className={styles.filterCategory}>
                            <h4>Barrierefreiheit</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="smoking" name="smoking" onChange={onCheckboxChange}
                                       checked={state.smoking || false}/>
                                <label htmlFor="smoking">Rauchen</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="selfCheckIn" name="selfCheckIn" onChange={onCheckboxChange}
                                       checked={state.selfCheckIn || false}/>
                                <label htmlFor="selfCheckIn">Self Check-In</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="separateBeds" name="separateBeds" onChange={onCheckboxChange}
                                       checked={state.separateBeds || false}/>
                                <label htmlFor="separateBeds">Getrennte Betten</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="privateBath" name="privateBath" onChange={onCheckboxChange}
                                       checked={state.privateBath || false}/>
                                <label htmlFor="privateBath">Eigenes Bad</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="extraBedPossible" name="extraBedPossible"
                                       onChange={onCheckboxChange} checked={state.extraBedPossible || false}/>
                                <label htmlFor="extraBedPossible">Zusätzliches Bett möglich</label>
                            </div>
                        </div>

                        {/* General */}
                        <div className={styles.filterCategory}>
                            <h4>Allgemein</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="radio" name="radio" onChange={onCheckboxChange}
                                       checked={state.radio || false}/>
                                <label htmlFor="radio">Radio</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="towels" name="towels" onChange={onCheckboxChange}
                                       checked={state.towels || false}/>
                                <label htmlFor="towels">Handtücher</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="bedLinen" name="bedLinen" onChange={onCheckboxChange}
                                       checked={state.bedLinen || false}/>
                                <label htmlFor="bedLinen">Bettwäsche</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.propertyListContainer}>
                        <h2>Suchergebnis für {state.city}</h2>
                        <SortBy onSort={sortProperties}/>
                        <div className={styles.propertyContainer}>
                            {(state.filteredProperties && state.propertiesMainFields) && state.filteredProperties.map((property, index) => (
                                state.propertiesMainFields[index] && (
                                    <a
                                        key={index}
                                        href={property.socialMediaLink} // Use the property URL or desired link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.propertyLink} // Optional: Add a class for styling
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }} // Optional: Maintain style consistency
                                    >

                                        <PropertyCellView
                                            key={index}
                                            title={state.propertiesMainFields[index].title}
                                            description={truncateDescription(state.propertiesMainFields[index].description, 250)}
                                            image={state.propertiesMainFields[index].mainPhoto}
                                            price={state.propertiesMainFields[index].price}
                                            rating={property.rating}
                                            link={property.socialMediaLink}
                                            propertyType={property.propertyType}
                                            logo = {state.propertiesMainFields[index].logo}
                                        />
                                    </a>
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