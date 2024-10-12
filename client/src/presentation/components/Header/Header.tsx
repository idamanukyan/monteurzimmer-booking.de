import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import {PropertyService} from "../../../data/service/PropertyService";
import HeaderModel from "./HeaderModel";
import {useNavigate} from "react-router-dom";
import ContactUsModal from "../ContactUs/ContactUsModal";
import Button from "@mui/material/Button";
import SubscribeModal from "../Subscribe/SubscribeModal";

interface HeaderProps {
    city?: string
}

const Header: React.FC<HeaderProps> = ({ city }) => {
    const [isModalContactUsOpen, setIsModalContactUsOpen] = useState(false);
    const [isModalSubscribeOpen, setIsModalSubscribeOpen] = useState(false);
    const {
        state,
        setCity
    } = HeaderModel(new PropertyService())

    useEffect(() => {
        if (city != null) {
            setCity(city)
        }
    }, []);
    const navigate = useNavigate()

    return (
        <>
        <header className={styles.header}>
            <img src={'/assets/images/logo.png'} alt={''} onClick={() => navigate('/')}/>
            <div>
                <button
                    className={styles.searchButton}
                    onClick={() => setIsModalContactUsOpen(true)}
                >
                    Kontaktieren Sie uns
                </button>
                <button
                    className={styles.searchButton}
                    onClick={() => setIsModalSubscribeOpen(true)}
                >
                    Newsletter Abonnieren
                </button>
            </div>
        </header>

            {isModalContactUsOpen && <ContactUsModal closeModal={() => setIsModalContactUsOpen(false)}/>}
            {isModalSubscribeOpen && <SubscribeModal closeModal={() => setIsModalSubscribeOpen(false)}/>}
        </>
);
};

export default Header;
