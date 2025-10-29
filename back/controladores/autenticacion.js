const supabase = require('../config/database');

const controladorAutenticacion = {
  async login(req, res) {
    const { email } = req.body;

    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('id, email, nombre, tipo_usuario, telefono, avatar_url')
        .eq('email', email)
        .single();

      if (error || !usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = `fake-jwt-token-for-${usuario.id}`;

      res.json({
        exito: true,
        token,
        usuario: { 
          id: usuario.id, 
          email: usuario.email, 
          nombre: usuario.nombre,
          tipo_usuario: usuario.tipo_usuario,
          telefono: usuario.telefono,
          avatar_url: usuario.avatar_url
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async registro(req, res) {
    const { email, contraseña, nombre, tipo_usuario, telefono } = req.body;

    try {
      const { data: usuarioExistente } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .single();

      if (usuarioExistente) {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }

      const { data: nuevoUsuario, error } = await supabase
        .from('usuarios')
        .insert([{ 
          email, 
          nombre, 
          tipo_usuario,
          telefono: telefono || null,
          fecha_registro: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString()
        }])
        .select('id, email, nombre, tipo_usuario, telefono, avatar_url')
        .single();

      if (error) {
        console.error('Error creando usuario:', error);
        return res.status(500).json({ error: 'Error al crear el usuario' });
      }

      const token = `fake-jwt-token-for-${nuevoUsuario.id}`;

      res.status(201).json({
        exito: true,
        token,
        usuario: { 
          id: nuevoUsuario.id, 
          email: nuevoUsuario.email, 
          nombre: nuevoUsuario.nombre,
          tipo_usuario: nuevoUsuario.tipo_usuario,
          telefono: nuevoUsuario.telefono,
          avatar_url: nuevoUsuario.avatar_url
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = controladorAutenticacion;