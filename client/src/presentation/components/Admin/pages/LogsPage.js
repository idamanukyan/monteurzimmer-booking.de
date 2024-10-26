import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/LogsPage.css';

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of logs per page
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLogs = async (page) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(
                `http://localhost:8080/api/logs?page=${page}&size=${pageSize}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs(currentPage);
    }, [currentPage]);

    // Filter logs based on searchTerm
    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages based on filtered logs
    const totalPages = Math.ceil(filteredLogs.length / pageSize);

    // Get the logs for the current page after filtering
    const currentLogs = filteredLogs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const getLogStyle = (level) => {
        switch (level) {
            case 'INFO':
                return { color: 'green' }; // Green for info
            case 'WARN':
                return { color: 'orange' }; // Orange for warning
            case 'ERROR':
                return { color: 'red' }; // Red for error
            default:
                return {};
        }
    };

    return (
        <div className="logs-page">
            <h2>Protokolle der letzten 5 Tage</h2>
            <input
                type="text"
                placeholder="Nach Logs suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="logs-list">
                {currentLogs.length > 0 ? (
                    currentLogs.map((log, index) => (
                        <div key={index} className="log-item">
                            <span className={`log-level ${log.level.toLowerCase()}`}>{log.level}</span>
                            <span className="log-message">{log.message}</span>
                            <span className="log-timestamp">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>Keine Protokolle verfügbar.</p>
                )}
            </div>
            {/* Pagination controls */}
            <div className="pagination-controls">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Zurück
                </button>
                <span className="pagination-info">
                    Seite {currentPage} von {totalPages} Seiten
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default LogsPage;
