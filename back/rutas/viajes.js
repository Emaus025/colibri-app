const express = require('express');
const router = express.Router();
const controladorViajes = require('../controladores/viajes');
const { autenticarToken } = require('../middleware/autenticacion');
const { validarViaje } = require('../middleware/validacion');

router.get('/', controladorViajes.obtenerViajes);
router.get('/:id', controladorViajes.obtenerViajePorId);
router.post('/', autenticarToken, validarViaje, controladorViajes.crearViaje);

module.exports = router;