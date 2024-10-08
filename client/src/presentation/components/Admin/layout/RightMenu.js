import React from "react";
import './style/RightMenu.css';
import adminIcon from "../pages/style/public/admin.svg";
import logsIcon from "../pages/style/public/log.svg";
import housesIcon from "../pages/style/public/houses.svg";
import cityIcon from "../pages/style/public/city.svg";
import newsletterIcon from "../pages/style/public/newsletter.svg";
import formIcon from "../pages/style/public/form.svg";
import graphIcon from "../pages/style/public/charts.svg";
import documentIcon from "../pages/style/public/document.svg";

const RightMenu = () => {
    const today = new Date().toLocaleDateString();

    return (
        <div className="main-container">
            <div className="right-menu">
                <a href="/admin/dashboard">
                    <img src={adminIcon} alt="Dashboard Icon" className="menu-icon"/>
                    Haupt-Dashboard
                </a>
                <a href="/admin/logs">
                    <img src={logsIcon} alt="Logs Icon" className="menu-icon"/>
                    Protokolle
                </a>
                <a href="/admin/all-properties">
                    <img src={housesIcon} alt="Properties Icon" className="menu-icon"/>
                    Eigenschaften
                </a>
                <a href="/admin/cities">
                    <img src={cityIcon} alt="Cities Icon" className="menu-icon"/>
                    Städte
                </a>
                <a href="/admin/newsletter">
                    <img src={newsletterIcon} alt="Newsletter Icon" className="menu-icon"/>
                    Newsletter-Abonnement
                </a>
                <a href="/admin/form-submission">
                    <img src={formIcon} alt="Form Submission Icon" className="menu-icon"/>
                    Formular-Übermittlungsseite
                </a>
                <a href="/admin/graphs">
                    <img src={graphIcon} alt="Graphs" className="menu-icon"/>
                    Diagramme
                </a>
                <a href="/admin/documents">
                    <img src={documentIcon} alt="documets" className="menu-icon"/>
                    Unterlagen
                </a>
            </div>
        </div>
    );
};


export default RightMenu;
