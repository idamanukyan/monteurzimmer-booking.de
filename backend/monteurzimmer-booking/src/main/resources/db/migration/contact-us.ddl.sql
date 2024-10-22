CREATE TABLE contact_forms
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name    VARCHAR(255) NOT NULL,
    user_phone   VARCHAR(255) NOT NULL,
    user_email   VARCHAR(255) NOT NULL,
    user_date    DATE         NOT NULL,
    user_message TEXT         NOT NULL
);
