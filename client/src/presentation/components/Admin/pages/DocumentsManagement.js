import React from 'react';
import './style/DocumentsManagement.css';

const DocumentsManagement = () => {
    // List of document file names
    const documents = [
        'Technical-Document.pdf',
        'Admin-Guide.pdf',
        'User-Guide.pdf',
        // Add other document names as needed
    ];

    return (
        <div className="documents-management-container">
            <h2>Dokumentenverwaltung</h2>
            <div className="documents-list">
                {documents.map((document) => (
                    <DocumentCard key={document} document={document} />
                ))}
            </div>
        </div>
    );
};

const DocumentCard = ({ document }) => (
    <div className="document-card">
        <h3>{document}</h3>
        <iframe
            src={`/docs/${document}`} // Directly reference the document path
            width="100%"
            height="400"
            title={document}
            className="document-iframe"
        />
    </div>
);

export default DocumentsManagement;
