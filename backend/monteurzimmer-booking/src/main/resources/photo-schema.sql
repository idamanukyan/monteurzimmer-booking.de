CREATE TABLE Property_Photos
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT,
    photo_url   VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_primary  BOOLEAN   DEFAULT FALSE,
    FOREIGN KEY (property_id) REFERENCES properties (property_id)
);
