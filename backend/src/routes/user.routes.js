const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controllers');


// --> rota responsavel por criar um novo 'User':(POST)localhost:3000/api/v1/register

router.post('/register', userController.registerNewUser);


//---> rota de login User':(POST)localhost:3000/api/v1/login

router.post('/login', userController.loginUser);

// rota de profite do 'User':(GET)localhost:3000/api/v1/userProfile
router.get('/userProfile', auth,  userController.returnUserProfile)
// nomes tem que ser de acordo com aquilo que sera feito ;

// localhost:3000/api/v1/:id
// router.get('/:id', userController.getUser);

router.delete('/:id', userController.removeUser);

router.patch('/:id', userController.updateUser)
module.exports = router;