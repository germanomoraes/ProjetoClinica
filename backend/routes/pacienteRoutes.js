const express = require('express');
const PacienteController = require('../controllers/PacienteController');

const router = express.Router();

router.get('/', PacienteController.getAll);
router.get('/:id', PacienteController.getById);
router.post('/', PacienteController.create);
router.put('/:id', PacienteController.update);
router.delete('/:id', PacienteController.delete);

module.exports = router;