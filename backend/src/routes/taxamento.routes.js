const express = require('express');
const router = express.Router();
const Taxamento = require('../controllers/taxamento.controllers');

router.post('/register', Taxamento.registerTaxamento);

router.get('/getTaxamento', Taxamento.getTaxamento);

router.patch('/:id', Taxamento.updateTaxamento);

router.delete('/:id', Taxamento.removeTaxamento);

module.exports = router;