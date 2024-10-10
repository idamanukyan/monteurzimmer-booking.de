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

    const sortProperties = (option: string) => {
        let sortedProperties = [...(state.filteredProperties || [])];

        switch (option) {
            case "Price: Low to High":
                sortedProperties.sort((a, b) => a.price - b.price);
                break;
            case "Price: High to Low":
                sortedProperties.sort((a, b) => b.price - a.price);
                break;
            case "Rating: Low to High":
                sortedProperties.sort((a, b) => a.rating - b.rating);
                break;
            case "Rating: High to Low":
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
                            <h4>Popular Filters</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="quietLocation" name="quietLocation" onChange={onCheckboxChange} checked={state.quietLocation || false}/>
                                <label htmlFor="quietLocation">Quiet Location</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="goodTransportation" name="goodTransportation" onChange={onCheckboxChange} checked={state.goodTransportation || false}/>
                                <label htmlFor="goodTransportation">Good Transportation</label>
                            </div>
                        </div>

                        {/* Room Facilities */}
                        <div className={styles.filterCategory}>
                            <h4>Room Facilities</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="wifi" name="wifi" onChange={onCheckboxChange} checked={state.wifi || false}/>
                                <label htmlFor="wifi">Wifi</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="tv" name="tv" onChange={onCheckboxChange} checked={state.tv || false}/>
                                <label htmlFor="tv">TV</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="cookingFacilities" name="cookingFacilities" onChange={onCheckboxChange} checked={state.cookingFacilities || false}/>
                                <label htmlFor="cookingFacilities">Cooking Facilities</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="coffeeMachine" name="coffeeMachine" onChange={onCheckboxChange} checked={state.coffeeMachine || false}/>
                                <label htmlFor="coffeeMachine">Coffee Machine</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="microwave" name="microwave" onChange={onCheckboxChange} checked={state.microwave || false}/>
                                <label htmlFor="microwave">Microwave</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="fridge" name="fridge" onChange={onCheckboxChange} checked={state.fridge || false}/>
                                <label htmlFor="fridge">Fridge</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="dishwasher" name="dishwasher" onChange={onCheckboxChange} checked={state.dishwasher || false}/>
                                <label htmlFor="dishwasher">Dishwasher</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="bathtub" name="bathtub" onChange={onCheckboxChange} checked={state.bathtub || false}/>
                                <label htmlFor="bathtub">Bathtub</label>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div className={styles.filterCategory}>
                            <h4>Accessibility</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="smoking" name="smoking" onChange={onCheckboxChange} checked={state.smoking || false}/>
                                <label htmlFor="smoking">Smoking</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="selfCheckIn" name="selfCheckIn" onChange={onCheckboxChange} checked={state.selfCheckIn || false}/>
                                <label htmlFor="selfCheckIn">Self Check-In</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="separateBeds" name="separateBeds" onChange={onCheckboxChange} checked={state.separateBeds || false}/>
                                <label htmlFor="separateBeds">Separate Beds</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="privateBath" name="privateBath" onChange={onCheckboxChange} checked={state.privateBath || false}/>
                                <label htmlFor="privateBath">Private Bath</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="extraBedPossible" name="extraBedPossible" onChange={onCheckboxChange} checked={state.extraBedPossible || false}/>
                                <label htmlFor="extraBedPossible">Extra Bed Possible</label>
                            </div>
                        </div>

                        {/* General */}
                        <div className={styles.filterCategory}>
                            <h4>General</h4>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="radio" name="radio" onChange={onCheckboxChange} checked={state.radio || false}/>
                                <label htmlFor="radio">Radio</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="towels" name="towels" onChange={onCheckboxChange} checked={state.towels || false}/>
                                <label htmlFor="towels">Towels</label>
                            </div>
                            <div className={styles.filterItem}>
                                <input type="checkbox" id="bedLinen" name="bedLinen" onChange={onCheckboxChange} checked={state.bedLinen || false}/>
                                <label htmlFor="bedLinen">Bed Linen</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.propertyListContainer}>
                        <h2>Search result for {state.city}</h2>
                        <SortBy onSort={sortProperties} />
                        <div className={styles.propertyContainer}>
                            {(state.filteredProperties && state.propertiesMainFields) && state.filteredProperties.map((property, index) => (
                                state.propertiesMainFields[index] && (
                                    <PropertyCellView
                                        key={index}
                                        title={state.propertiesMainFields[index].title}
                                        description={state.propertiesMainFields[index].description}
                                        image={state.propertiesMainFields[index].image}
                                        price={property.price}
                                        rating={property.rating}
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