-- Active: 1704758451940@@127.0.0.1@3306
-- Criar a tabela USERS

CREATE TABLE
    users(
        id TEXT NOT NULL PRIMARY KEY,
        apelido TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME())
    );

SELECT * FROM users