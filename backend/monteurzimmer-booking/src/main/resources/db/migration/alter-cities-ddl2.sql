ALTER TABLE cities
    ADD COLUMN latitude  DOUBLE,
    ADD COLUMN longitude DOUBLE;

ALTER Table properties
    add column city_id bigint references cities(id);