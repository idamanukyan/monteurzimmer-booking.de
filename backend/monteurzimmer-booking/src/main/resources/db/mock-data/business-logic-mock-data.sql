-- Insert 10 mock data entries into the properties table
INSERT INTO properties
(property_name, property_type, description, address, price_per_night, full_price, price_per_bed, rating, is_available,
 country, city, room_count, bed_count, number_of_guests, social_media_link, wifi, tv, separate_beds, private_bath,
 cooking_facilities, radio, towels,
 extra_bed_possible, bed_linen, fridge, coffee_machine, microwave, dishwasher, wc, terrace,
 kettle, bathtub, garden, cooking_utensils, washing_machine, self_check_in, smoking, quiet_location,
 good_transportation, shops_nearby, neighborhood, bathrooms, latitude, longitude, created_at,
 is_favorite)

VALUES ('Cosy Apartment', 'Wohnung', 'A quiet apartment in the city center.', 'Mitte X Strasse', 15, 550, 8, 4.5, TRUE,
        'Germany',
        'Berlin', 2, 3, 5, 'https://www.monteurzimmer.de/wohnung/13597-berlin-d409273a52',
        TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE,
        TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE,
        'Mitte', 1, 52.5200, 13.4050, NOW(), true),

       ('Modern Guesthouse', 'Gastezimmer', 'A modern guesthouse close to public transport.', 'Hamburg X Strasse',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Hamburg', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/14471-potsdam-e4178fa552?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Charming Cottage', 'Haus', 'A charming cottage with a beautiful garden.', 'Munich X Strasse',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Munich', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/22765-hamburg-b9d04aab52?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Luxury Villa', 'Haus', 'A luxurious villa with a private pool.', 'Frankfurt X Strasse',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Frankfurt', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/24113-kiel-bd895f6652?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Budget Pension', 'Pension', 'Affordable pension with basic amenities.', 'Cologne X Strasse',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Cologne', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/39112-magdeburg-03bb134852?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('City Center Hotel', 'Hotel', 'Hotel in the heart of the city with all amenities.', 'Düsseldorf',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Cologne', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/04103-leipzig-ed704ae352?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Quiet Countryside Retreat', 'Herberge', 'A peaceful retreat in the countryside.', 'Stuttgart',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Cologne', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/93053-regensburg-076edd2752?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Comfy Pension', 'Pension', 'Comfortable pension with friendly staff.', 'Leipzig',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Cologne', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/60598-frankfurt-am-main-de0af43c52?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Historic Mansion', 'Haus', 'A grand historic mansion with modern amenities.', 'Nuremberg',
        20, 150, 10, 4.2, TRUE, 'Germany', 'Cologne', 1, 2, 2,
        'https://www.monteurzimmer.de/wohnung/41460-neuss-fb08935831?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false),

       ('Studio Apartment', 'Wohnung', 'A small, modern studio apartment.', 'Bremen', 4.1, 110, 20, 4.1, TRUE,
        'Germany',
        'Bremen',
        20, 150, 10, 'hhttps://www.monteurzimmer.de/wohnung/47608-geldern-1bd13ae74e?booking_adults=1',
        FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE,
        'Altona', 4, 53.5511, 9.9937, NOW(), false);


INSERT INTO property_photos (id, property_id, photo_url, uploaded_at, is_primary)
VALUES (1, 1, 'frontend/project/src/assets/storage/upload/property-photos/photo1.jpg', '2024-10-04 10:30:00', true),
       (2, 2, 'frontend/project/src/assets/storage/upload/property-photos/photo2.jpg', '2024-10-04 10:35:00', false),
       (3, 3, 'frontend/project/src/assets/storage/upload/property-photos/photo3.jpg', '2024-10-03 11:00:00', true),
       (4, 4, 'frontend/project/src/assets/storage/upload/property-photos/photo4.jpg', '2024-10-01 12:45:00', true),
       (5, 5, 'frontend/project/src/assets/storage/upload/property-photos/photo5.jpg', '2024-09-30 09:00:00', false),
       (6, 6, 'frontend/project/src/assets/storage/upload/property-photos/photo6.jpg', '2024-09-30 09:00:00', false),
       (7, 7, 'frontend/project/src/assets/storage/upload/property-photos/photo7.jpg', '2024-09-30 09:00:00', false);

INSERT INTO cities (name, is_favorite, photo_url)
VALUES ('Berlin', TRUE, 'storage/upload/icons/city/berlin.jpg'),
       ('Hamburg', TRUE, 'storage/upload/icons/city/hamburg.jpg'),
       ('Munich', TRUE, 'storage/upload/icons/city/munich.jpg'),
       ('Cologne', TRUE, 'storage/upload/icons/city/cologne.jpg'),
       ('Stuttgart', TRUE, 'storage/upload/icons/city/stuttgart.jpg'),
       ('Dortmund', TRUE, 'storage/upload/icons/city/dortmund.jpg'),
       ('Lepizig', TRUE, 'storage/upload/icons/city/leipzig.jpg'),
       ('Essen', TRUE, 'storage/upload/icons/city/essen.jpg'),
       ('Hannover', TRUE, 'storage/upload/icons/city/hannover.jpg'),
       ('Nuremberg', FALSE, 'storage/upload/icons/city/nuremberg.jpg');