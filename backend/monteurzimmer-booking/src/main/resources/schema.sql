-- Create Users Table
CREATE TABLE users
(
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                  VARCHAR(255) NOT NULL,
    surname               VARCHAR(255) NOT NULL,
    email                 VARCHAR(255) NOT NULL UNIQUE,
    password              VARCHAR(255) NOT NULL,
    phone_number          VARCHAR(15),
    address               TEXT,
    profile_picture       VARCHAR(255),
    created               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted               BOOLEAN   DEFAULT FALSE,
    last_login_date       TIMESTAMP,
    is_verified           BOOLEAN   DEFAULT FALSE,
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
    user_id          BIGINT    NOT NULL,
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