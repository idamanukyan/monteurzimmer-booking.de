import React from "react";
import './style/RightMenu.css';
import RightMenu from './RightMenu';
import Header from "./Header";
import './style/Dashboard.css';
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Header />
            <div className="dashboard-content">
                <RightMenu />
                <div className="main-content">
                    {/* Nested routes will render here */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};


export default Dashboard;

