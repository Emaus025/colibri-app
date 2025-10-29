const express = require('express');
const router = express.Router();
const controladorReservas = require('../controladores/reservas');
const { autenticarToken } = require('../middleware/autenticacion');
const { validarReserva } = require('../middleware/validacion');

router.get('/mis-reservas', autenticarToken, controladorReservas.obtenerReservasUsuario);
router.post('/', autenticarToken, validarReserva, controladorReservas.crearReserva);

module.exports = router;