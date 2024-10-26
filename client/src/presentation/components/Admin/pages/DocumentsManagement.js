import React from 'react';
import './style/DocumentsManagement.css';

const DocumentsManagement = () => {
    const documents = [
        'Technical-Document.pdf',
        'Admin-Guide.pdf',
        'User-Guide.pdf',
    ];

    return (
        <div className="documents-management-page">
            <h2 className="documents-management-title">Dokumentenverwaltung</h2>
            <div className="documents-management-list">
                {documents.map((document) => (
                    <DocumentCard key={document} document={document} />
                ))}
            </div>
        </div>
    );
};

const DocumentCard = ({ document }) => (
    <div className="document-card">
        <h3 className="document-card-title">{document}</h3>
        <iframe
            src={`/docs/${document}`}
            width="100%"
            height="400"
            title={document}
            className="document-iframe"
        />
    </div>
);

export default DocumentsManagement;