import React, {useEffect} from 'react';
import styles from './Header.module.css';
import {PropService} from "../../../data/service/PropService";
import HeaderModel from "./HeaderModel";

interface HeaderProps {
    city?: string
}

const Header: React.FC<HeaderProps> = ({ city }) => {
    const {
        state,
        setCity
    } = HeaderModel(new PropService())

    useEffect(() => {
        if (city != null) {
            setCity(city)
        }
    }, []);

    return (
        <header className={styles.header}>
            <img src={'/assets/images/logo.png'} alt={''}/>
            <nav>
                <ul>
                    <li><a href="/" className={styles.contactUs}>Contact Us</a></li>
                    <li><a href="/" className={styles.contactUs}>Subscribe</a></li>
                    {/*<li><a href="/" className={styles.contactUs}>Contact Us</a></li>*/}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
