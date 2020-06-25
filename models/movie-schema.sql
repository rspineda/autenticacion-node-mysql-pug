DROP DATABASE IF EXISTS movies;
CREATE DATABASE IF NOT EXISTS movies;
USE movies;
CREATE TABLE IF NOT EXISTS movie(
    movie_id VARCHAR(9) PRIMARY KEY,
    title VARCHAR(30),
    release_year VARCHAR(4),
    rating DECIMAL(2,1),
    image VARCHAR(255)
);

/*  Este código lo puedo llevar y copiar directamente en localhost/phpmyadmin --> sql . 
Hacerlo en la base de datos principal, no dentro de una bae de datos concreta. Si hay dudas ver video 12 node, minuto25. 
*/