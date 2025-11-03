const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Cargar variables de entorno
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar configuración de base de datos
const supabase = require('./config/database');

// Importar rutas
const rutasAutenticacion = require('./rutas/autenticacion');
const rutasViajes = require('./rutas/viajes');
const rutasReservas = require('./rutas/reservas');

// Configuración de CORS
const corsOptions = {
  origin: [
    'http://localhost:19006', // Expo Web
    'http://localhost:3000',  // Desarrollo web
    'capacitor://localhost',  // Capacitor
    'http://localhost'        // General
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas API
app.use('/api/auth', rutasAutenticacion);
app.use('/api/viajes', rutasViajes);
app.use('/api/reservas', rutasReservas);

// Ruta de salud
app.get('/api/salud', (req, res) => {
  res.json({ 
    estado: 'OK', 
    timestamp: new Date().toISOString(),
    mensaje: 'Servidor funcionando correctamente',
    baseDatos: 'Conectada a Supabase'
  });
});

// Ruta de prueba de base de datos
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error de Supabase:', error);
      return res.status(500).json({ 
        error: 'Error conectando a Supabase',
        detalle: error.message 
      });
    }
    
    res.json({ 
      estado: 'OK', 
      mensaje: 'Conexión a Supabase verificada',
      datos: data 
    });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: error.message 
    });
  }
});

// Manejo de rutas no encontradas - CORREGIDO
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    ruta: req.originalUrl,
    metodo: req.method
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    detalle: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
  console.log(`Base de datos: Supabase conectada`);
  console.log(`Iniciado: ${new Date().toLocaleString()}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;