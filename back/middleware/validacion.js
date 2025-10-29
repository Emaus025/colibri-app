const validarRegistro = (req, res, next) => {
  const { email, contraseña, nombre, tipo_usuario } = req.body;

  if (!email || !contraseña || !nombre || !tipo_usuario) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: email, contraseña, nombre, tipo_usuario' 
    });
  }

  if (!['conductor', 'pasajero'].includes(tipo_usuario)) {
    return res.status(400).json({ 
      error: 'Tipo de usuario debe ser "conductor" o "pasajero"' 
    });
  }

  if (!validarEmail(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }

  next();
};

const validarLogin = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  next();
};

const validarViaje = (req, res, next) => {
  const { origen, destino, fecha, asientos_disponibles, precio } = req.body;

  if (!origen || !destino || !fecha || !asientos_disponibles || !precio) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: origen, destino, fecha, asientos_disponibles, precio' 
    });
  }

  next();
};

const validarReserva = (req, res, next) => {
  const { viaje_id, pasajero_id, asientos_reservados } = req.body;

  if (!viaje_id || !pasajero_id || !asientos_reservados) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: viaje_id, pasajero_id, asientos_reservados' 
    });
  }

  next();
};

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  validarRegistro,
  validarLogin,
  validarViaje,
  validarReserva
};