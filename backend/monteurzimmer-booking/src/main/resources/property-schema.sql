-- Create Properties Table
CREATE TABLE properties
(
    property_id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id                BIGINT,
    property_name           VARCHAR(255)   NOT NULL,
    property_type           ENUM ('Gastezimmer', 'Haus', 'Wohnung', 'Pension', 'Herberge', 'Hotel', 'Andere'),
    description             TEXT,
    location                VARCHAR(255),
    price_per_night         DECIMAL(10, 2) NOT NULL,
    rating                  DECIMAL(3, 2),
    is_available            BOOLEAN   DEFAULT TRUE,
    country                 VARCHAR(100),
    city                    VARCHAR(100),
    room_count              INT,
    bed_count               INT,
    wlan                    boolean,
    tv                      boolean,
    getrennte_betten        boolean,
    privates_bad            boolean,
    kochmoglichkeit         boolean,
    radio                   boolean,
    handtucher_inkl         boolean,
    zustellbett_moglich     boolean,
    bettwasche_inkl         boolean,
    kuhlschrank             boolean,
    kaffeemaschine          boolean,
    mikrowelle              boolean,
    spulmaschine            boolean,
    wc                      boolean,
    terrasse                boolean,
    wasserkocher            boolean,
    badewanne               boolean,
    garten                  boolean,
    kochutensilien          boolean,
    waschmaschine           boolean,
    eigenstandiger_check_in boolean,
    raucher                 boolean,
    ruhige_lage             boolean,
    gute_vekehrsanbindung   boolean,
    geschafte_in_der_nahe   boolean,
    neighborhood            VARCHAR(100),
    review_score            DECIMAL(3, 2),
    bathrooms               INT,
    latitude                DECIMAL(9, 6),
    longitude               DECIMAL(9, 6),
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create SearchHistory Table
CREATE TABLE search_history
(
    search_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT NOT NULL,
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    country          VARCHAR(100),
    city             VARCHAR(100),
    property_type    ENUM ('hotel', 'apartment'),
    check_in_date    DATE,
    check_out_date   DATE,
    number_of_people INT,
    budget_range     DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create RelatedProperties Table
CREATE TABLE related_properties
(
    related_id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id         BIGINT NOT NULL,
    related_property_id BIGINT NOT NULL,
    comparison_criteria VARCHAR(255),
    sort_order          INT,
    FOREIGN KEY (property_id) REFERENCES properties (property_id) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id) REFERENCES properties (property_id) ON DELETE CASCADE
);

ALTER TABLE properties
    MODIFY property_type VARCHAR(255);

ALTER TABLE properties
    ADD number_of_guests INT;
