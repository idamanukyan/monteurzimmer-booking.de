CREATE TABLE favorites
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     bigint          NULL,
    session_id  VARCHAR(255) NULL,
    property_id bigint          NOT NULL,
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (property_id) ON DELETE CASCADE
);
