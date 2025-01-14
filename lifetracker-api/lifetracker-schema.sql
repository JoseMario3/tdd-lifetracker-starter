CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    first_name      TEXT NOT NULL,    
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at      DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE nutrition (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    calories    INTEGER NOT NULL,
    quantity    INTEGER NOT NULL,
    image_url   TEXT NOT NULL,
    user_id     INTEGER NOT NULL,
    created_at  DATE NOT NULL DEFAULT CURRENT_DATE
);