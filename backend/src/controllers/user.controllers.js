const User = require('../models/user.model');


// async e await


// --> metodo responsavel por registrar usuarios

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    console.log(isUser);
    // retorna uma mensagem caso o email desse novo registro ja constar na base de dados
    if (isUser.length >= 1) {
      return res.status(409).json({ message: 'Sorry! this email is  already registered!' });

    };
    const newUser = new User(req.body);
    console.log('log1: ' + newUser);
    const user = await newUser.save();
    console.log('log2: ' + user);
    const token = await newUser.generateAuthToken();
    res.status(201).json({ message: 'User created successfully!', user, token })
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Erro ao realizar o login! Verifique suas credenciais!' })
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ message: 'Usuário(a) logado com sucesso', user, token })
  } catch (err) {
    res.status(400).json({ err: err })
  }
}
exports.getUser = async (req, res) => {
  try {
    const idUser = req.body._id;
    const user = await User.getUser(idUser);
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ err: err })
  }
}
exports.returnUserProfile = async (req, res) => {

  const user = await User.getUser()
  res.send(user)
  // getUsers
  // await res.json(req.userData);
}
exports.getUser = async (req, res) => {
  const _id = req.params.id;
  const idUserName = await User.getoneuser(_id);
  if (!idUserName) {
    res.status(424).json({ message: 'O usuário não foi enontrado' });
    return;
  }
  res.send(idUserName);
}
exports.removeUser = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log('aqui  ' + _id);
    const removeUser = await User.deleteUser(_id);
    // console.log('Isso vem junto' + removeUser);
    res.send(removeUser)
  } catch (err) {
    res.status(500).json({ err: err })
  }
}
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    let userPerson = await {
      email: req.body.email,
      name: req.body.name
    }

    const updateUser = await User.updateUser({ _id: id }, userPerson);

    res.status(200).json(updateUser)
  } catch (err) {
    res.status(500).json({ err: err })
  }
}