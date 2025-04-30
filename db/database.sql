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

-- table users
INSERT INTO users (name,email,password)
    VALUES ('Juan','juan@mail.com','$2a$12$P4kD/dTthEG4WIZQ/9PDc./1dj5g/kzFGpvXw0YWW.MF2DyhE3rk.'),   --12345678
           ('Pedro','pedro@mail.com','$2a$12$r8QZ6BTCG0bjfgsnyitVSeWkYNsQETuUh/tvcOqRDrYKrIseeRBJu'); --12345678

-- table wallets
INSERT INTO wallets (user_id, tag, chain, address)
  VALUES 
    (1, 'Wallet principal', 'Ethereum', '0xAbc1234567890abcdefABCDEF1234567890abcd'),
    (1, 'Secundaria', 'Polygon', '0x1111222233334444555566667777888899990000'),
    (2, 'Inversión', 'Binance Smart Chain', '0x9999888877776666555544443333222211110000'),
    (2, 'Cold Storage', 'Bitcoin', '1BoatSLRHtKNngkdXEeobR76b53LETtpyT');
    
--Some commands in SQL shell
-- \l  DB list
-- \c typescriptdatabase;   select table
--   \d  show table