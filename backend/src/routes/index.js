const express  = require('express');

const router = express.Router();

router.get('/api/v1', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Seja bem-vindo(a) a API  mode.js + mongodb!',
        version:'1.0.0'
    });
});

router.get('/api/v2', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Seja bem-vindo(a) a API  mode.js + mongodb v2!',
        version:'1.0.0'
    });
});
router.get('/api/v3', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Seja bem-vindo(a) a API  mode.js + mongodb v3!',
        version:'1.0.0'
    });
});
router.get('/api/v4', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Seja bem-vindo(a) a API  mode.js + mongodb v4!',
        version:'1.0.0'
    });
});
module.exports = router;