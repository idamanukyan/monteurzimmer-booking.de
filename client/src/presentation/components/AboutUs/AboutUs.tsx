import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles.aboutUsContainer}>
            <div className={styles.aboutUsItem}>
                <h3 className="title">Monteurzimmer für jede Situation</h3>
                <p className="text">Wir bieten dir eine breite Auswahl an Monteurzimmern in ganz Deutschland - egal, ob du in Berlin, München oder einer anderen Stadt eine Unterkunft suchst. Unsere Plattform bietet dir die Möglichkeit, die Preise und Verfügbarkeiten der Zimmer schnell und einfach zu vergleichen. Du entscheidest, was für dich am besten passt, ohne Zeit zu verlieren. Unser Ziel ist es, dir bei der Suche nach dem idealen Monteurzimmer zu helfen, damit du dich voll auf deine Arbeit konzentrieren kannst. Einfach, schnell und zuverlässig - so findest du das passende Zimmer.</p>
            </div>
            <div className={styles.aboutUsItem}>
                <h3 className="title">Individuelle Lösungen für Teams</h3>
                <p className="text">Unsere Plattform ist ideal für Teams und große Gruppen, die gemeinsam auf Montage oder einem Bauprojekt arbeiten. Mit unserer Suchfunktion kannst du Unterkünfte für Gruppen ab 10 Personen finden und sofort buchen. Ob du eine komfortable Unterkunft für deine Mitarbeiter in Stuttgart, Leipzig oder Hamburg benötigst - bei uns findest du das passende Angebot. Unsere flexiblen Buchungsoptionen ermöglichen es dir, die Aufenthaltsdauer an dein Projekt anzupassen, und bieten ausreichend Platz für alle. So sorgst du für eine stressfreie Unterkunftslösung für dein gesamtes Team.</p>
            </div>
            <div className={styles.aboutUsItem}>
                <h3 className="title">Schnell, einfach und preiswert</h3>
                <p className="text">Zeit ist Geld - das wissen wir, besonders bei Bauprojekten oder Montagen. Daher haben wir es uns zur Aufgabe gemacht, dir eine Plattform zu bieten, auf der du mit nur wenigen Klicks die besten Monteurzimmer und Arbeiterunterkünfte findest. Dank unserer modernen Technologie kannst du Angebote nach Preis, Verfügbarkeit und Lage filtern und direkt online buchen. Ob in Essen, Köln oder Frankfurt - wir helfen dir, die beste Lösung für dein Budget zu finden. So sparst du Zeit und kannst dich auf das Wesentliche konzentrieren: deine Arbeit.</p>
            </div>
        </div>
    );
};

export default AboutUs;
