import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './style/SingleProperty.css';
import wifiIcon from '../pages/style/public/searchIcons/wifi.svg';
import tvIcon from '../pages/style/public/searchIcons/tv.svg';
import privateBath from '../pages/style/public/searchIcons/privateBath.svg';
import cookingFacilities from '../pages/style/public/searchIcons/cookingFacilities.svg';
import separateBeds from '../pages/style/public/searchIcons/separateBeds.svg';
import radio from '../pages/style/public/searchIcons/radio.svg';
import towels from '../pages/style/public/searchIcons/towel.svg';
import fridge from '../pages/style/public/searchIcons/fridge.svg';
import coffeeMachine from '../pages/style/public/searchIcons/coffeeMachine.svg';
import microwave from '../pages/style/public/searchIcons/microwave.svg';
import dishwasher from '../pages/style/public/searchIcons/dishwasher.svg';
import wc from '../pages/style/public/searchIcons/wc.svg';
import terrace from '../pages/style/public/searchIcons/terrace.svg';
import kettle from '../pages/style/public/searchIcons/kettle.svg';
import bathtub from '../pages/style/public/searchIcons/bathtub.svg';
import garden from '../pages/style/public/searchIcons/garden.svg';
import cookingUtensils from '../pages/style/public/searchIcons/cookingUtensils.svg';
import washingMachine from '../pages/style/public/searchIcons/washingMachine.svg';
import smoking from '../pages/style/public/searchIcons/smoking.svg';
import quietLocation from '../pages/style/public/searchIcons/quietLocation.svg';
import goodTransportation from '../pages/style/public/searchIcons/quietLocation.svg';
import shopsNearby from '../pages/style/public/searchIcons/shopsNearby.svg';

const SingleProperty = () => {
    const {propertyId} = useParams();
    const [property, setProperty] = useState(null);
    const [linkPreview, setLinkPreview] = useState(null); // State for link preview data
    const [error, setError] = useState(null); // State for error handling
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/${propertyId}`);
                setProperty(response.data);
                setIsFavorite(response.data.favorite);
                if (response.data.socialMediaLink) {
                    await fetchLinkPreview(response.data.socialMediaLink);
                }
            } catch (error) {
                console.error('Error fetching property:', error);
                setError('Failed to load property data. Please try again later.');
            }
        };
        fetchProperty();
    }, [propertyId]);


    // Function to fetch link preview data from LinkPreview API
    const fetchLinkPreview = async (link) => {
        try {
            const apiKey = '447b14b374c440e2dad14c10a0e6f513'; // Your LinkPreview API key
            const response = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${link}`);

            // Set the link preview state
            setLinkPreview({
                title: response.data.title || 'No title found',
                description: response.data.description || 'No description found',
                image: response.data.image || 'default-image-url.jpg',
            });
        } catch (error) {
            console.error('Error fetching link preview:', error.response ? error.response.data : error.message);
            setLinkPreview({
                title: 'Link Preview Unavailable',
                description: 'Could not retrieve link preview.',
                image: 'default-image-url.jpg',
            });
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const response =
                await axios.put(`/api/properties/add-favorite-property/${propertyId}`, {
                    propertyId,
                    isFavorite: !isFavorite
                });

            console.log('Updated favorite response:', response.data); // Log the response from the update

            // Fetch the property again to get the updated status
            const updatedPropertyResponse = await axios.get(`http://localhost:8080/api/properties/${propertyId}`);
            console.log('Updated property:', updatedPropertyResponse.data); // Log the updated property

            setProperty(updatedPropertyResponse.data);
            setIsFavorite(updatedPropertyResponse.data.isFavorite); // Update local favorite state
        } catch (err) {
            console.error('Error updating favorite status:', err);
            setError('Failed to update favorite status. Please try again.');
        }
    };

    useEffect(() => {
        console.log("Favorite: " + isFavorite)
    }, [isFavorite]);


    // Display loading state or error message
    if (error) return <div>{error}</div>; // Display error message
    if (!property) return <div>Loading...</div>; // Loading state

    return (
        <div className="property-details">
            <h1>{property.propertyName}</h1>
            <h2>{property.propertyType}</h2>

            {/* Table layout for property details */}
            <table className="property-table">
                <thead>
                <tr>
                    <th>Angebotsbezeichnung</th>
                    <th>Preis & Versand</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {linkPreview ? (
                            <div className="link-preview">
                                <a href={property.socialMediaLink} target="_blank" rel="noopener noreferrer">
                                    <img src={linkPreview.image} alt="Link Preview" className="preview-image"/>
                                    <div className="preview-details">
                                        <h4>{linkPreview.title}</h4>
                                        <p>{linkPreview.description}</p>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </td>

                    <td>{property.price} €</td>
                    <td>
                        <button className="open-link-button"
                                onClick={() => window.open(property.socialMediaLink, '_blank')}>
                            View Offer
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Another Table for Other Property Details */}
            <table className="property-details-table">
                <thead>
                <tr>
                    <th>Details</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>City</td>
                    <td>{property.city.name}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{property.address}</td>
                </tr>
                <tr>
                    <td>Rooms</td>
                    <td>{property.roomCount}</td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{property.description}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{property.price} €</td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td>{property.rating} / 5</td>
                </tr>
                <tr>
                    <td>Favorite</td>
                    <td>
                        {isFavorite !== undefined ? (
                            <>
                                <span>{isFavorite ? 'Yes' : 'No'}</span>
                                <button onClick={handleToggleFavorite}>
                                    {isFavorite ? 'Remove property from favorites' : 'Add to favorites'}
                                </button>
                            </>
                        ) : (
                            <span>Refresh to see the update...</span>
                        )}
                    </td>

                </tr>
                </tbody>
            </table>

            {/* Boolean Values Table */}
            <table className="boolean-values-table">
                <thead>
                <tr>
                    <th>Feature</th>
                    <th>Available</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>WIFI</td>
                    <td>{property.wifi ? <img src={wifiIcon} alt="WLAN" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>TV</td>
                    <td>{property.tv ? <img src={tvIcon} alt="TV" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Private Bath</td>
                    <td>{property.privateBath ? <img src={privateBath} alt="privateBath" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Cooking Facilities</td>
                    <td>{property.cookingFacilities ?
                        <img src={cookingFacilities} alt="cookingFacilities" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Separate Beds</td>
                    <td>{property.separateBeds ?
                        <img src={separateBeds} alt="separateBeds" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Radio</td>
                    <td>{property.radio ? <img src={radio} alt="radio" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Towels</td>
                    <td>{property.towels ? <img src={towels} alt="towels" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Fridge</td>
                    <td>{property.fridge ? <img src={fridge} alt="fridge" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Coffee Machine</td>
                    <td>{property.coffeeMachine ?
                        <img src={coffeeMachine} alt="coffeeMachine" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Microwave</td>
                    <td>{property.microwave ? <img src={microwave} alt="microwave" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Dishwasher</td>
                    <td>{property.dishwasher ? <img src={dishwasher} alt="dishwasher" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>WC</td>
                    <td>{property.wc ? <img src={wc} alt="wc" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Terrace</td>
                    <td>{property.terrace ? <img src={terrace} alt="terrace" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Kettle</td>
                    <td>{property.kettle ? <img src={kettle} alt="kettle" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Bathtub</td>
                    <td>{property.bathtub ? <img src={bathtub} alt="bathtub" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Garden</td>
                    <td>{property.garden ? <img src={garden} alt="garden" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Cooking Utensils</td>
                    <td>{property.cookingUtensils ?
                        <img src={cookingUtensils} alt="cookingUtensils" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Washing Machine</td>
                    <td>{property.washingMachine ?
                        <img src={washingMachine} alt="washingMachine" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Smoking</td>
                    <td>{property.smoking ? <img src={smoking} alt="smoking" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Quiet Location</td>
                    <td>{property.quietLocation ?
                        <img src={quietLocation} alt="quietLocation" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Good Transportation</td>
                    <td>{property.goodTransportation ?
                        <img src={goodTransportation} alt="goodTransportation" className="icon"/> : 'No'}</td>
                </tr>
                <tr>
                    <td>Shops Nearby</td>
                    <td>{property.shopsNearby ? <img src={shopsNearby} alt="shopsNearby" className="icon"/> : 'No'}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SingleProperty;
