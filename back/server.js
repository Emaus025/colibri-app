// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/carpool.db'   // Render: usa /tmp (único directorio escribible)
  : './carpool.db';     // Local

const db = new Database(dbPath);

// Crear tablas si no existen
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

  INSERT OR IGNORE INTO users (id, email, name) VALUES (1, 'user@example.com', 'Usuario Prueba');
`);

console.log(`✅ Base de datos lista en: ${dbPath}`);

// Simulación de "login": solo valida que el email exista
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  const user = db.prepare('SELECT id, email, name FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  // En una app real usarías JWT, aquí usamos un token simple
  const token = `fake-jwt-token-for-${user.id}`;

  res.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// Crear una reserva (booking)
app.post('/api/bookings', (req, res) => {
  // En una app real, validarías el token aquí
  const { origin, destination, date, userId } = req.body;

  if (!origin || !destination || !date || !userId) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, origin, destination, date)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(userId, origin, destination, date);

    res.status(201).json({
      success: true,
      booking: { id: info.lastInsertRowid, userId, origin, destination, date }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Ruta de salud (útil para verificar que el servidor está vivo)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: ${dbPath}`);
});