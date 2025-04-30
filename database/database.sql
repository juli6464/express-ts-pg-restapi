CREATE DATABASE typescriptdatabase;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE wallets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tag VARCHAR(255),
  chain VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO users (name,email,password)
    VALUES ('Juan','juan@mail.com','$2a$12$xs/5mJ5W4tt35hu9xVfGL.rq9yEqqeavfNtKanhdFWUQXDesrKwue'),   --123456
           ('Pedro','pedro@mail.com','$2a$12$vQj7GaQ4WBQmBPaIRRU9quaBpiAskHcUYYbsCT6plZq9ukQJdhW7q'); --1234ab

--Some commands in SQL shell
-- \l  lista base de datos
-- \c typescriptdatabase;   selecciona tabla
--   \d  lista tabla