const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/login', UsuarioController.login);
router.post('/register', UsuarioController.register);

module.exports = router;