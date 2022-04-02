const express = require('express');
const router = express.Router();

const Taxa = require('../controllers/taxa.controllers');

router.post('/register', Taxa.registerTaxa);

router.get('/getTaxa', Taxa.getTaxa);

router.patch('/:id', Taxa.updateTaxa);

router.delete('/:id', Taxa.removeTaxa);

module.exports = router;


