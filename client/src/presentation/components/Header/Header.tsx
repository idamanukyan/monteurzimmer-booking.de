import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
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
