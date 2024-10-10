import React from 'react';
import { Property } from '../../../data/model/PropertiesModel';
import styles from './PropertiesScreen.module.css';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

interface PropertyCellProps {
    title: string
    description: string
    image: string
    price: number
    rating: number
    link: string
    propertyType: string
}

const PropertyCellView: React.FC<PropertyCellProps> = ({title, description, image, price, rating, link, propertyType
}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.propertyCellContainer}>
            <img src={image} alt={''}/>
            <div className={styles.propertyCellDetails}>
                <h5>{propertyType}</h5>
                <h1>{title}</h1>
                <h4>{description}</h4>
            </div>
            <div className={styles.propertyCellRating}>
                <div>
                    <p>Rating: {rating}</p>
                    <Button
                        variant="contained"
                        onClick={() => window.open(link, '_blank')}
                    >Visit Page</Button>
                </div>
                <h1>€{price}</h1>
            </div>
        </div>
    )
}

export default PropertyCellView;
