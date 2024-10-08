import React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './style/TrafficChart.css';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TrafficChart = () => {
    // Static chart data
    const trafficData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Website Traffic',
            data: [120, 150, 170, 130, 180, 190, 220], // Example data for each day
            borderColor: 'rgba(75,192,192,1)',
            fill: false
        }]
    };

    return (
        <div className="traffic-chart">
            <Line data={trafficData} />
        </div>
    );
};

export default TrafficChart;
