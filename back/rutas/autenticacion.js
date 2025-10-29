const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../controladores/autenticacion');
const { validarLogin, validarRegistro } = require('../middleware/validacion');

router.post('/login', validarLogin, controladorAutenticacion.login);
router.post('/registro', validarRegistro, controladorAutenticacion.registro);

module.exports = router;