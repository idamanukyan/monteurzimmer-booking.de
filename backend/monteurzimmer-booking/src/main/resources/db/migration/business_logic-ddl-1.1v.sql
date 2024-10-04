-- Create Properties Table
-- property-type = ('Gastezimmer', 'Haus', 'Wohnung', 'Pension', 'Herberge', 'Hotel', 'Andere')
CREATE TABLE properties
(
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id            BIGINT,
    property_name       VARCHAR(255),
    property_type       VARCHAR(255),
    description         TEXT,
    address             VARCHAR(255),
    price_per_night     DECIMAL(10, 2),
    full_price          DECIMAL(10, 2),
    price_per_bed       DECIMAL(10, 2),
    rating              DECIMAL(3, 2),
    is_available        BOOLEAN   DEFAULT TRUE,
    country             VARCHAR(100),
    city                VARCHAR(100),
    room_count          INT,
    bed_count           INT,
    number_of_guests    INT,
    social_media_link   VARCHAR(255),
    wifi                boolean,
    tv                  boolean,
    separate_beds       boolean,
    private_bath        boolean,
    cooking_facilities  boolean,
    radio               boolean,
    towels              boolean,
    extra_bed_possible  boolean,
    bed_linen           boolean,
    fridge              boolean,
    coffee_machine      boolean,
    microwave           boolean,
    dishwasher          boolean,
    wc                  boolean,
    terrace             boolean,
    kettle              boolean,
    bathtub             boolean,
    garden              boolean,
    cooking_utensils    boolean,
    washing_machine     boolean,
    self_check_in       boolean,
    smoking             boolean,
    quiet_location      boolean,
    good_transportation boolean,
    shops_nearby        boolean,
    neighborhood        VARCHAR(100),
    bathrooms           INT,
    latitude            DECIMAL(9, 6),
    longitude           DECIMAL(9, 6),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_favorite         boolean,
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
    property_type    VARCHAR(255),
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
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE TABLE property_photos
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT,
    photo_url   VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_primary  BOOLEAN   DEFAULT FALSE,
    FOREIGN KEY (property_id) REFERENCES properties (id)
);

CREATE TABLE newsletter_subscriptions
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    surname       VARCHAR(255),
    birth_date    date,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active     BOOLEAN   DEFAULT TRUE
);

CREATE TABLE favorites
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     bigint       NULL,
    session_id  VARCHAR(255) NULL,
    property_id bigint       NOT NULL,
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE TABLE cities
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    photo_url   VARCHAR(255)
);

