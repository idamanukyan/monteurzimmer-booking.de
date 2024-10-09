import React from 'react';
import { Property } from '../../../data/model/PropertiesModel';
import styles from './PropertiesScreen.module.css';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

interface PropertyCellProps {
    propertyId: number
    propertyName: string
    propertyType: string
    description: string
    location: string
    price: number
    rating: number
    country: string
    city: string
    roomCount: number
    bedCount: number
    numberOfGuests: number
    neighborhood: string
    bathrooms: number
    socialMediaLink: string
}

const PropertyCell: React.FC<PropertyCellProps> = ({propertyId, propertyName, propertyType, description, location, price, rating, country, city, roomCount, bedCount, numberOfGuests, neighborhood, bathrooms, socialMediaLink
}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.propertyCellContainer}>
            <img src={'assets/images/emptyHouseImg.jpg'} alt={''}/>
            <div className={styles.propertyCellDetails}>
                <h5>{propertyType}</h5>
                <h1>{propertyName}</h1>
                <h4>{description}</h4>
                <p>Room Count: {roomCount}</p>
                <p>Bed Count: {bedCount}</p>
                <p>{city}, {country}</p>
            </div>
            <div className={styles.propertyCellRating}>
                <div>
                    <p>Rating: {rating}</p>
                    <Button
                        variant="contained"
                        onClick={() => window.open(socialMediaLink, '_blank')}
                    >Visit Page</Button>
                </div>
                <h1>${price}</h1>
            </div>
        </div>
    );
};

export default PropertyCell;
