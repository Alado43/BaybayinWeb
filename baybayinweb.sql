-- Create Database
CREATE DATABASE IF NOT EXISTS baybayinweb;
USE baybayinweb;

-- =========================
-- Table: Characters
-- =========================
CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    char_symbol VARCHAR(10) NOT NULL,
    latin VARCHAR(50) NOT NULL,
    example VARCHAR(255),
    description TEXT
);

-- =========================
-- Table: Resources
-- =========================
CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    type VARCHAR(50),
    description TEXT
);

-- =========================
-- Table: News
-- =========================
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE,
    summary TEXT,
    url VARCHAR(255)
);

-- =========================
-- Table: Merchandise
-- =========================
CREATE TABLE merchandise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    price VARCHAR(50)
);

-- =========================
-- Sample Data
-- =========================

-- Characters
INSERT INTO characters (char_symbol, latin, example, description) VALUES
('ᜀ', 'A', 'Aso (dog)', 'The vowel A in Baybayin'),
('ᜁ', 'I/E', 'Isda (fish)', 'The vowel I or E in Baybayin'),
('ᜂ', 'U/O', 'Ulo (head)', 'The vowel U or O in Baybayin'),
('ᜃ', 'Ka', 'Kama (bed)', 'The consonant Ka in Baybayin'),
('ᜄ', 'Ga', 'Gabi (night)', 'The consonant Ga in Baybayin'),
('ᜅ', 'Nga', 'Ngiti (smile)', 'The consonant Nga in Baybayin');

-- Resources
INSERT INTO resources (title, url, type, description) VALUES
('Baybayin Font Collection', '#', 'fonts', 'Download free Baybayin fonts for your computer'),
('Learn Baybayin App', '#', 'app', 'Interactive mobile app for learning Baybayin'),
('Baybayin History Documentary', '#', 'video', 'Documentary about the history of Baybayin'),
('Baybayin Workshop', '#', 'event', 'Online workshop for beginners'),
('Baybayin Merchandise', '#', 'shop', 'T-shirts, stickers, and more with Baybayin designs');

-- News
INSERT INTO news (title, date, summary, url) VALUES
('New Bill Proposes Baybayin in Government Documents', '2023-05-15', 'A new bill in the Philippine Congress seeks to require Baybayin in all government communications.', '#'),
('University Adds Baybayin to Curriculum', '2023-04-22', 'A leading Philippine university has announced it will include Baybayin studies in its Filipino language courses.', '#'),
('Baybayin Art Exhibit Opens in Manila', '2023-03-10', 'Contemporary artists showcase modern interpretations of Baybayin in a month-long exhibition.', '#');

-- Merchandise
INSERT INTO merchandise (title, image, description, price) VALUES
('Modernong Kultura Customizeable Logos', 'https://via.placeholder.com/200x200/FFD700/000000?text=Baybayin+Logo', 'Modern Baybayin logo design', 'Php250'),
('Modernong Kultura Customizeable Signage', 'https://via.placeholder.com/200x200/FFD700/000000?text=Baybayin+Sign', 'Traditional Baybayin signage design', 'Php200'),
('Modernong Kultura Customizeable Tattoo', 'https://via.placeholder.com/200x200/FFD700/000000?text=Baybayin+Tattoo', 'Baybayin-inspired tattoo designs', 'Php300'),
('Modernong Kultura Customizeable T-shirt', 'https://via.placeholder.com/200x200/FFD700/000000?text=Baybayin+T-shirt', 'Modern Baybayin t-shirt design', 'Php199');
