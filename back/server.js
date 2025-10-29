// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Supabase
const supabaseUrl = 'https://fhcsrtxcpephjjaresox.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY3NydHhjcGVwaGpqYXJlc294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MDM0MDYsImV4cCI6MjA3NzI3OTQwNn0.1IC6mv9pAPLZUxvdLPKAESuS-tJjbBuvpbzrbKEPM9c';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

console.log(`✅ Conexión a Supabase establecida`);

// Simulación de "login": solo valida que el email exista
app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // En una app real usarías JWT, aquí usamos un token simple
    const token = `fake-jwt-token-for-${user.id}`;

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una reserva (booking)
app.post('/api/bookings', async (req, res) => {
  // En una app real, validarías el token aquí
  const { origin, destination, date, userId } = req.body;

  if (!origin || !destination || !date || !userId) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        { user_id: userId, origin, destination, date }
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la reserva' });
    }

    res.status(201).json({
      success: true,
      booking: { id: booking.id, userId: booking.user_id, origin: booking.origin, destination: booking.destination, date: booking.date }
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
  console.log(`📊 Base de datos: Supabase conectada`);
});