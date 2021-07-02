  
CREATE DATABASE passwords;


CREATE TABLE note(
    password_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    password_name VARCHAR(255)
);