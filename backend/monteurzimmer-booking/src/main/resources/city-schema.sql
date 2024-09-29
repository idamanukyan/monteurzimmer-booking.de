CREATE TABLE cities
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE
);