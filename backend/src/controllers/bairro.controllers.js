const Bairro = require('../models/bairro.models');

exports.registerBairro = async (req, res) => {
  try {
    const isBairro = await Bairro.find({bairro: req.body.bairro});

    if(isBairro.length >= 1){
      return res.status(409).json({message:'Bairro ja registrado'})
    };
    // const isBairro = req.body.bairro;
    const newBairro = new Bairro(req.body);
    const bairro = await newBairro.save();
    res.status(201).json({ message: 'Bairro created successfully!', bairro })

  } catch (err) {
    res.status(400).json({ err: err })
  }
}
exports.getBairro = async (req, res) => {
  try {
    const bairro = await Bairro.getBairro();
    if(bairro.length === 0){
      return res.status(409).json({message:'Nenhum registro encontrado!'})
    }
    res.status(200).json(bairro)
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

exports.updateBairro = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('chegou aqui bairro update' + id);
    let bairro = await {
      bairro: req.body.bairro

    }

    const bairroUpdate = await Bairro.updateBairro({ _id: id }, bairro);

    res.status(200).json(bairroUpdate)
  } catch (err) {
    res.status(500).json({ err: err })
  }
}
exports.removeBairro = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log('aqui  ' + _id);
    const removeBairro = await Bairro.removeBairro(_id);
    // console.log('Isso vem junto' + removeUser);
    res.send(removeBairro)
  } catch (err) {
    res.status(500).json({ err: err })
  }
}