-- Insert 10 mock data entries into the properties table
INSERT INTO properties
(property_name, property_type, description, location, price_per_night, rating, is_available, country, city,
 room_count, bed_count, wlan, tv, getrennte_betten, privates_bad, kochmoglichkeit, radio, handtucher_inkl,
 zustellbett_moglich, bettwasche_inkl, kuhlschrank, kaffeemaschine, mikrowelle, spulmaschine, wc, terrasse,
 wasserkocher, badewanne, garten, kochutensilien, waschmaschine, eigenstandiger_check_in, raucher, ruhige_lage,
 gute_vekehrsanbindung, geschafte_in_der_nahe, neighborhood, review_score, bathrooms, latitude, longitude,
 social_media_link, price)

VALUES ('Cosy Apartment', 'Wohnung', 'A quiet apartment in the city center.', 'Berlin', 75.00, 4.5, TRUE, 'Germany',
        'Berlin', 2, 3, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE,
        TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE,
        'Mitte', 4.8, 1, 52.5200, 13.4050, 'https://www.monteurzimmer.de/wohnung/13597-berlin-d409273a52',75.00),

       ('Modern Guesthouse', 'Gastezimmer', 'A modern guesthouse close to public transport.', 'Hamburg', 55.00, 4.2,
        TRUE, 'Germany', 'Hamburg', 1, 2, TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE,
        TRUE,
        FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE,
        'Altona', 4.5, 1, 53.5511, 9.9937,
        'https://www.monteurzimmer.de/wohnung/14471-potsdam-e4178fa552?booking_adults=1',55.00),

       ('Charming Cottage', 'Haus', 'A charming cottage with a beautiful garden.', 'Munich', 100.00, 4.7, TRUE,
        'Germany', 'Munich', 3, 5, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE,
        FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE,
        'Schwabing', 4.9, 2, 48.1351, 11.5820,
        'https://www.monteurzimmer.de/wohnung/22765-hamburg-b9d04aab52?booking_adults=1',100.00),

       ('Luxury Villa', 'Haus', 'A luxurious villa with a private pool.', 'Frankfurt', 250.00, 4.9, TRUE, 'Germany',
        'Frankfurt', 5, 10, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
        TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE,
        'Westend', 4.7, 3, 50.1109, 8.6821,
        'https://www.monteurzimmer.de/wohnung/24113-kiel-bd895f6652?booking_adults=1',250.00),

       ('Budget Pension', 'Pension', 'Affordable pension with basic amenities.', 'Cologne', 40.00, 3.9, TRUE,
        'Germany', 'Cologne', 1, 1,
        TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE,
        FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, 'Altstadt', 4.0, 1, 50.9375, 6.9603,
        'https://www.monteurzimmer.de/wohnung/39112-magdeburg-03bb134852?booking_adults=1',40.00),

       ('City Center Hotel', 'Hotel', 'Hotel in the heart of the city with all amenities.', 'Düsseldorf', 150.00,
        4.6, TRUE, 'Germany', 'Düsseldorf', 4, 8,
        TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
        TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Innenstadt', 4.7, 3, 51.2277, 6.7735,
        'https://www.monteurzimmer.de/wohnung/04103-leipzig-ed704ae352?booking_adults=1',150.00),

       ('Quiet Countryside Retreat', 'Herberge', 'A peaceful retreat in the countryside.', 'Stuttgart', 85.00, 4.4,
        TRUE, 'Germany', 'Stuttgart', 2, 4, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
        TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Bad Cannstatt', 4.6, 2, 48.7758,
        9.1829, 'https://www.monteurzimmer.de/wohnung/93053-regensburg-076edd2752?booking_adults=1',85.00),

       ('Comfy Pension', 'Pension', 'Comfortable pension with friendly staff.', 'Leipzig', 60.00, 4.3, TRUE,
        'Germany', 'Leipzig', 2, 3, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
        TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE,
        TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, 'Plagwitz', 4.4, 2, 51.3397, 12.3731,
        'https://www.monteurzimmer.de/wohnung/60598-frankfurt-am-main-de0af43c52?booking_adults=1',60.00),

       ('Historic Mansion', 'Haus', 'A grand historic mansion with modern amenities.', 'Nuremberg', 180.00, 4.8,
        TRUE, 'Germany', 'Nuremberg', 6, 12, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE,
        TRUE,
        TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Altstadt', 4.9, 4, 49.4521, 11.0767,
        'https://www.monteurzimmer.de/wohnung/41460-neuss-fb08935831?booking_adults=1',180.00),

       ('Studio Apartment', 'Wohnung', 'A small, modern studio apartment.', 'Bremen', 45.00, 4.1, TRUE, 'Germany',
        'Bremen', 1, 1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE,
        TRUE,
        TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Mitte', 4.3, 1, 53.0793, 8.8017,
        'https://www.monteurzimmer.de/wohnung/47608-geldern-1bd13ae74e?booking_adults=1',45.00);