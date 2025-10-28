// backend/init-db.js
const Database = require('better-sqlite3');
const db = new Database('carpool.db');

// Usuarios (solo para prueba)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  -- Insertar un usuario de prueba
  INSERT OR IGNORE INTO users (id, email, name) VALUES (1, 'user@example.com', 'Usuario Prueba');
`);

console.log('Base de datos inicializada: carpool.db');
db.close();