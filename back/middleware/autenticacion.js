const autenticarToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  // En una app real validarías JWT aquí
  // Por ahora simulamos la autenticación
  try {
    const userId = token.replace('fake-jwt-token-for-', '');
    req.usuarioId = userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { autenticarToken };