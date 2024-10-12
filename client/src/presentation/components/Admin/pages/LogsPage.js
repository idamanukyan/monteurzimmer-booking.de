import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style/LogsPage.css';

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of logs per page

    const fetchLogs = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/logs?page=${page}&size=${pageSize}`);
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs(currentPage);
    }, [currentPage]);

    if (!logs || logs.length === 0) {
        return <p>No logs available</p>;
    }

    const totalPages = Math.ceil(logs.length / pageSize);

    // Get the logs for the current page
    const currentLogs = logs.slice(
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
                    <p>No logs available.</p>
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
                    Seite {currentPage} von {totalPages}
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
