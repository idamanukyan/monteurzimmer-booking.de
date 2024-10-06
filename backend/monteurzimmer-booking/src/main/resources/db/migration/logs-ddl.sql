CREATE TABLE logs
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME     NOT NULL,
    level     VARCHAR(10)  NOT NULL,
    message   VARCHAR(255) NOT NULL
);