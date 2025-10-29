const supabase = require('../config/database');

const controladorViajes = {
  async crearViaje(req, res) {
    const { origen, destino, fecha, asientos_disponibles, precio, detalles } = req.body;
    const conductor_id = req.usuarioId;

    try {
      const { data: viaje, error } = await supabase
        .from('viajes')
        .insert([
          { 
            conductor_id, 
            origen, 
            destino, 
            fecha, 
            asientos_disponibles, 
            precio,
            detalles: detalles || '',
            estado: 'activo',
            fecha_creacion: new Date().toISOString()
          }
        ])
        .select('*')
        .single();

      if (error) {
        console.error('Error creando viaje:', error);
        return res.status(500).json({ error: 'Error al crear el viaje' });
      }

      res.status(201).json({
        exito: true,
        viaje
      });
    } catch (error) {
      console.error('Error creando viaje:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerViajes(req, res) {
    const { origen, destino, fecha } = req.query;

    try {
      let query = supabase
        .from('viajes')
        .select(`
          *,
          conductor:usuarios(nombre, telefono, avatar_url, calificacion_promedio)
        `)
        .eq('estado', 'activo')
        .gt('asientos_disponibles', 0);

      if (origen) query = query.ilike('origen', `%${origen}%`);
      if (destino) query = query.ilike('destino', `%${destino}%`);
      if (fecha) query = query.eq('fecha', fecha);

      const { data: viajes, error } = await query;

      if (error) {
        console.error('Error obteniendo viajes:', error);
        return res.status(500).json({ error: 'Error al obtener viajes' });
      }

      res.json({
        exito: true,
        viajes: viajes || []
      });
    } catch (error) {
      console.error('Error obteniendo viajes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerViajePorId(req, res) {
    const { id } = req.params;

    try {
      const { data: viaje, error } = await supabase
        .from('viajes')
        .select(`
          *,
          conductor:usuarios(*),
          reservas:reservas(*, pasajero:usuarios(*))
        `)
        .eq('id', id)
        .single();

      if (error || !viaje) {
        return res.status(404).json({ error: 'Viaje no encontrado' });
      }

      res.json({
        exito: true,
        viaje
      });
    } catch (error) {
      console.error('Error obteniendo viaje:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = controladorViajes;