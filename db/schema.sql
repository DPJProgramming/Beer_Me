CREATE TABLE IF NOT EXISTS beers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brewery TEXT,
    type TEXT,
    description TEXT,
    rating REAL CHECK(rating >= 0 AND rating <= 5),
    date TEXT CHECK(date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'), -- enforce YYYY-MM-DD
    image TEXT,
    location TEXT
);

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Summer Ale', 'Sierra Nevada', 'Ale', 'A crisp and refreshing summer beer.', 4.2, '2025-08-01', 'img/01 (1).png', 'Chico, CA');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Amber Lager', 'Brooklyn Brewery', 'Lager', 'Smooth amber lager with malty notes.', 4.0, '2025-08-02', 'img/01 (2).png', 'Brooklyn, NY');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Stout Supreme', 'Guinness', 'Stout', 'Rich and creamy stout with roasted flavors.', 4.5, '2025-08-03', 'img/01 (3).png', 'Dublin, Ireland');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('IPA Extreme', 'Stone Brewing', 'IPA', 'Hoppy IPA with citrus and pine notes.', 4.3, '2025-08-04', 'img/01 (4).png', 'Escondido, CA');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Pale Ale', 'Sierra Nevada', 'Ale', 'Classic pale ale with balanced hops.', 4.5, '2025-08-05', 'img/01 (5).png', 'Chico, CA');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Wheat Wonder', 'Blue Moon', 'Wheat', 'Smooth wheat beer with hints of orange.', 4.1, '2025-08-06', 'img/01 (6).png', 'Golden, CO');

INSERT INTO beers (name, brewery, type, description, rating, date, image, location)
VALUES 
('Porter Classic', 'Founders', 'Porter', 'Dark porter with chocolate and coffee notes.', 4.4, '2025-08-07', 'img/01 (7).png', 'Grand Rapids, MI');
