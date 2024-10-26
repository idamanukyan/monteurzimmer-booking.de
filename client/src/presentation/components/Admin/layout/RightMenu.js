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
    return (
        <div className="main-container">
            <nav className="right-menu">
                <a href="/admin/dashboard" className="menu-item">
                    <img src={adminIcon} alt="Haupt-Dashboard Icon" className="menu-icon" />
                    Haupt-Dashboard
                </a>
                <a href="/admin/logs" className="menu-item">
                    <img src={logsIcon} alt="Protokolle Icon" className="menu-icon" />
                    Protokolle
                </a>
                <a href="/admin/all-properties" className="menu-item">
                    <img src={housesIcon} alt="Eigenschaften Icon" className="menu-icon" />
                    Eigenschaften
                </a>
                <a href="/admin/cities" className="menu-item">
                    <img src={cityIcon} alt="Städte Icon" className="menu-icon" />
                    Städte
                </a>
                <a href="/admin/newsletter" className="menu-item">
                    <img src={newsletterIcon} alt="Newsletter-Abonnement Icon" className="menu-icon" />
                    Newsletter-Abonnement
                </a>
                <a href="/admin/form-submission" className="menu-item">
                    <img src={formIcon} alt="Formular-Übermittlungsseite Icon" className="menu-icon" />
                    Formular-Übermittlungsseite
                </a>
                <a href="/admin/graphs" className="menu-item">
                    <img src={graphIcon} alt="Diagramme Icon" className="menu-icon" />
                    Diagramme
                </a>
                <a href="/admin/documents" className="menu-item">
                    <img src={documentIcon} alt="Unterlagen Icon" className="menu-icon" />
                    Unterlagen
                </a>
            </nav>
        </div>
    );
};

export default RightMenu;
