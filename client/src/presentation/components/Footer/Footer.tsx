import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerColumn}>
                <h3>Über uns</h3>
                <p>
                    Wir sind bestrebt, den besten Service in der Branche zu bieten. Unser Ziel ist es,
                    Ihre Erwartungen zu übertreffen und außergewöhnlichen Wert zu liefern.
                </p>
            </div>
            <div className={styles.footerColumn}>
                <h3>Kontaktinformationen</h3>
                <p>Adresse: 123 Hauptstraße, Ihre Stadt, Ihr Land</p>
                <p>Telefon: (123) 456-7890</p>
                <p>E-Mail: info@yourcompany.com</p>
            </div>
            <div className={styles.footerColumn}>
                <h3>Links zu sozialen Medien</h3>
                <ul className={styles.socialMedia}>
                    <li><img src={"https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"} alt={''}/> <a href="#" className={styles.socialIcon}>Facebook</a></li>
                    <li><img src={"https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=1060&t=st=1728017452~exp=1728018052~hmac=9b9d6ea2c97b0e950fd008f1f101552227445c592e37625338c9201229de16f7"} alt={''}/> <a href="#" className={styles.socialIcon}>Twitter</a></li>
                    <li><img src={"https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"} alt={''}/> <a href="#" className={styles.socialIcon}>Instagram</a></li>
                </ul>
            </div>
            <div className={styles.footerColumn}>
                <h3>Rechtliche Informationen</h3>
                <ul className={styles.legalLinks}>
                    <li><a href="/AGB.pdf" target="_blank">AGB</a></li>
                    <li><a href="/Datenschutzerklarung.pdf" target="_blank">Datenschutzbestimmungen</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
