const express = require('express');
const ConsultaController = require('../controllers/ConsultaController');

const router = express.Router();

router.get('/', ConsultaController.getAll);
router.get('/:id', ConsultaController.getById);
router.post('/', ConsultaController.create);
router.put('/:id', ConsultaController.update);
router.delete('/:id', ConsultaController.delete);

module.exports = router;