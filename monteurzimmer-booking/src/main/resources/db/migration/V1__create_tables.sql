-- Create Users Table
CREATE TABLE users
(
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                  VARCHAR(255) NOT NULL,
    surname               VARCHAR(255),
    email                 VARCHAR(255) NOT NULL UNIQUE,
    password              VARCHAR(255) NOT NULL,
    phone_number          VARCHAR(15),
    address               TEXT,
    profile_picture       VARCHAR(255),
    created               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted               BOOLEAN   DEFAULT FALSE,
    last_login_date       TIMESTAMP,
    is_verified_via_email BOOLEAN   DEFAULT FALSE,
    has_admin_approved    BOOLEAN   DEFAULT FALSE,
    social_media_provider VARCHAR(50),
    social_media_id       VARCHAR(255),
    UNIQUE (email, deleted)
);

-- Create Roles Table
CREATE TABLE roles
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT
);

-- Create Permissions Table
CREATE TABLE permissions
(
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create Roles_Permissions Junction Table
CREATE TABLE roles_permissions
(
    role_id       BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
);

-- Create Roles_Users Junction Table
CREATE TABLE roles_users
(
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, user_id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create UserSessions Table
CREATE TABLE user_sessions
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT,
    session_id       VARCHAR(255),
    expiry_timestamp TIMESTAMP NOT NULL,
    is_active        BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create EmailVerifications Table
CREATE TABLE email_verifications
(
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id           BIGINT       NOT NULL,
    verification_code VARCHAR(255) NOT NULL,
    expiry_timestamp  TIMESTAMP    NOT NULL,
    is_verified       BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create PasswordResets Table
CREATE TABLE password_resets
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT       NOT NULL,
    reset_code       VARCHAR(255) NOT NULL,
    expiry_timestamp TIMESTAMP    NOT NULL,
    is_reset         BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create logs table
CREATE TABLE logs
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME     NOT NULL,
    level     VARCHAR(10)  NOT NULL,
    message   VARCHAR(255) NOT NULL
);

-- Create contact_us_form table
CREATE TABLE contact_form
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name    VARCHAR(255) NOT NULL,
    user_phone   VARCHAR(255) NOT NULL,
    user_email   VARCHAR(255) NOT NULL,
    user_date    DATE         NOT NULL,
    user_message TEXT         NOT NULL
);

-- Business logic tables

-- Create Properties Table
-- property-type = ('Gastezimmer', 'Haus', 'Wohnung', 'Pension', 'Herberge', 'Hotel', 'Andere')
CREATE TABLE properties
(
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_name        VARCHAR(255),
    property_type        VARCHAR(255),
    description          TEXT,
    address              VARCHAR(255),
    price                DECIMAL(10, 2),
    rating               DECIMAL(3, 2),
    room_count           INT,
    bed_count            INT,
    max_number_of_guests INT,
    social_media_link    VARCHAR(255),
    wifi                 boolean,
    tv                   boolean,
    separate_beds        boolean,
    private_bath         boolean,
    cooking_facilities   boolean,
    radio                boolean,
    towels               boolean,
    extra_bed_possible   boolean,
    bed_linen            boolean,
    fridge               boolean,
    coffee_machine       boolean,
    microwave            boolean,
    dishwasher           boolean,
    wc                   boolean,
    terrace              boolean,
    kettle               boolean,
    bathtub              boolean,
    garden               boolean,
    cooking_utensils     boolean,
    washing_machine      boolean,
    self_check_in        boolean,
    smoking              boolean,
    quiet_location       boolean,
    good_transportation  boolean,
    shops_nearby         boolean,
    neighborhood         VARCHAR(100),
    bathrooms            INT,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_favorite          boolean
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
    photo_url   VARCHAR(255),
    latitude    DECIMAL(9, 6), -- Precision of up to 6 decimal places for latitude
    longitude   DECIMAL(9, 6)  -- Precision of up to 6 decimal places for longitude
);

alter table properties
    add column city_id bigint references cities (id);

CREATE TABLE SearchLog
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    city         VARCHAR(255),
    distance     DOUBLE,
    otherFilters VARCHAR(500),
    ipAddress    VARCHAR(45),
    timestamp    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    searchParams TEXT
);
