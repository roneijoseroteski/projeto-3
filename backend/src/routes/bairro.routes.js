const express = require('express');
const router = express.Router();
const bairroController = require('../controllers/bairro.controllers');

router.post('/register',bairroController.registerBairro);

router.get('/getbairro', bairroController.getBairro)

router.patch('/:id',bairroController.updateBairro);

router.delete('/:id',bairroController.removeBairro);

module.exports = router;
