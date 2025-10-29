const supabase = require('../config/database');

const controladorReservas = {
  async crearReserva(req, res) {
    const { viaje_id, asientos_reservados } = req.body;
    const pasajero_id = req.usuarioId;

    try {
      // Verificar disponibilidad del viaje
      const { data: viaje, error: errorViaje } = await supabase
        .from('viajes')
        .select('*')
        .eq('id', viaje_id)
        .single();

      if (errorViaje || !viaje) {
        return res.status(404).json({ error: 'Viaje no encontrado' });
      }

      if (viaje.asientos_disponibles < asientos_reservados) {
        return res.status(400).json({ error: 'No hay suficientes asientos disponibles' });
      }

      // Crear reserva
      const { data: reserva, error } = await supabase
        .from('reservas')
        .insert([
          { 
            viaje_id, 
            pasajero_id, 
            asientos_reservados,
            estado: 'confirmada',
            fecha_reserva: new Date().toISOString()
          }
        ])
        .select(`
          *,
          viaje:viajes(*, conductor:usuarios(*)),
          pasajero:usuarios(*)
        `)
        .single();

      if (error) {
        console.error('Error creando reserva:', error);
        return res.status(500).json({ error: 'Error al crear la reserva' });
      }

      // Actualizar asientos disponibles
      await supabase
        .from('viajes')
        .update({ 
          asientos_disponibles: viaje.asientos_disponibles - asientos_reservados 
        })
        .eq('id', viaje_id);

      res.status(201).json({
        exito: true,
        reserva
      });
    } catch (error) {
      console.error('Error creando reserva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerReservasUsuario(req, res) {
    const usuario_id = req.usuarioId;

    try {
      const { data: reservas, error } = await supabase
        .from('reservas')
        .select(`
          *,
          viaje:viajes(*, conductor:usuarios(*))
        `)
        .eq('pasajero_id', usuario_id)
        .order('fecha_reserva', { ascending: false });

      if (error) {
        console.error('Error obteniendo reservas:', error);
        return res.status(500).json({ error: 'Error al obtener reservas' });
      }

      res.json({
        exito: true,
        reservas: reservas || []
      });
    } catch (error) {
      console.error('Error obteniendo reservas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = controladorReservas;