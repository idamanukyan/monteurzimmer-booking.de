import React from 'react';
import './style/DocumentsManagement.css'; // Add your styles

const DocumentsManagement = () => {
    // List of document file names (make sure these match your actual PDF file names)
    const documents = [
        'Technical-Document.pdf',
        'Admin-Guide.pdf',
        'User-Guide.pdf',
        // Add other document names as needed
    ];

    return (
        <div>
            <h2>Documents Management</h2>
            <div className="documents-list">
                {documents.map((document) => (
                    <div key={document} className="document-card">
                        <h3>{document}</h3>
                        <iframe
                            src={`${process.env.PUBLIC_URL}/docs/${document}`}
                            width="600"
                            height="400"
                            title={document}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentsManagement;
