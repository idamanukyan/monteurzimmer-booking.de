import React from "react";
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './style/TrafficChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TrafficChart = () => {
    const trafficData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Website Traffic',
            data: [120, 150, 170, 130, 180, 190, 220],
            borderColor: 'rgba(75,192,192,1)',
            fill: false
        }]
    };

    const pageViewsData = {
        labels: ['Home', 'About', 'Contact', 'Blog', 'Services'],
        datasets: [{
            label: 'Page Views',
            data: [300, 200, 150, 400, 250],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }]
    };

    return (
        <div className="traffic-chart">
            <h2>Website Traffic Over Time</h2>
            <Line data={trafficData} />
            <h2>Page Views</h2>
            <Bar data={pageViewsData} options={{ responsive: true }} />
        </div>
    );
};

export default TrafficChart;
