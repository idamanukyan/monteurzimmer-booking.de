ALTER TABLE properties
    MODIFY property_name VARCHAR(255),
    MODIFY price DECIMAL(10, 2);

INSERT INTO cities (name, is_favorite)
VALUES
    ('Berlin', TRUE),
    ('Munich', FALSE),
    ('Frankfurt', TRUE),
    ('Hamburg', FALSE),
    ('Stuttgart', TRUE);


