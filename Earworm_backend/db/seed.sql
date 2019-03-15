DROP DATABASE IF EXISTS earworms;
CREATE DATABASE earworms;

\c earworms 


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR UNIQUE NOT NULL
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR UNIQUE NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR,
  img_url VARCHAR,
  users_id INT REFERENCES users(id),
  genres_id INT REFERENCES genres(id)
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INT REFERENCES users(id) ON DELETE CASCADE,
  songs_id INT REFERENCES songs(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  body VARCHAR,
  users_id INT REFERENCES users(id),
  songs_id INT REFERENCES songs(id)
);

\COPY users(username) FROM '../db/users.csv' DELIMITER ',' CSV HEADER;

INSERT INTO genres(type) VALUES ('children song'),('pop'),('rock'),('folk'),('theme');

\COPY songs (title,img_url,users_id,genres_id) FROM '../songs.csv' DELIMITER ',' CSV HEADER;

\COPY favorites (users_id,songs_id) FROM '../favorites.csv' DELIMITER ',' CSV HEADER;

\COPY comments (body, users_id, songs_id) FROM '../comments.csv' DELIMITER ',' CSV HEADER;
