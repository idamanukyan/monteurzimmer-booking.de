INSERT INTO users
(name, surname, email, password, phone_number, address, profile_picture, is_verified, has_admin_approved,
 social_media_provider, social_media_id)
VALUES ('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', '1234567890', '123 Elm St', 'profile1.jpg', TRUE,
        TRUE, 'facebook', 'johnfacebookid'),
       ('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', '0987654321', '456 Oak St', 'profile2.jpg', TRUE,
        FALSE, 'google', 'janegoogleid'),
       ('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3', '5555555555', '789 Pine St', 'profile3.jpg',
        FALSE, FALSE, NULL, NULL);

INSERT INTO roles (name, description)
VALUES ('ADMIN', 'Administrator role with full access'),
       ('USER', 'Regular user with limited access'),
       ('MODERATOR', 'User with moderation privileges');

INSERT INTO permissions (name)
VALUES ('CREATE_USER'),
       ('EDIT_USER'),
       ('DELETE_USER'),
       ('VIEW_USERS'),
       ('MANAGE_ROLES');

INSERT INTO roles_permissions (role_id, permission_id)
VALUES (1, 1), -- ADMIN can CREATE_USER
       (1, 2), -- ADMIN can EDIT_USER
       (1, 3), -- ADMIN can DELETE_USER
       (1, 4), -- ADMIN can VIEW_USERS
       (1, 5), -- ADMIN can MANAGE_ROLES
       (2, 4); -- USER can VIEW_USERS

INSERT INTO roles_users (role_id, user_id)
VALUES (1, 1), -- John Doe is an ADMIN
       (2, 2), -- Jane Smith is a USER
       (2, 3); -- Alice Johnson is a USER

INSERT INTO user_sessions (user_id, expiry_timestamp, is_active)
VALUES (1, '2024-12-31 23:59:59', TRUE),
       (2, '2024-12-31 23:59:59', TRUE);

INSERT INTO email_verifications (user_id, verification_code, expiry_timestamp, is_verified)
VALUES (1, 'verificationcode1', '2024-12-31 23:59:59', TRUE),
       (2, 'verificationcode2', '2024-12-31 23:59:59', FALSE);

INSERT INTO password_resets (user_id, reset_code, expiry_timestamp, is_reset)
VALUES (3, 'resetcode1', '2024-12-31 23:59:59', FALSE);