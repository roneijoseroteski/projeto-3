const Taxamento = require('../models/taxamento.models');

exports.registerTaxamento = async (req, res) => {
  try {
    const isTaxamento = await Taxamento.find({bairro: req.body.bairro});
    console.log('taxamento tamanho ' + isTaxamento.length + 'body '+ req.body);
    if(isTaxamento.length >= 1){
      return res.status(409).json({message:'Este bairro ja possui uma taxa!'})
    };
    const newBairro = new Taxamento(req.body)
    const taxamento = await newBairro.save();
    res.status(201).json({ message: 'taxamento created successfully!', taxamento })
  } catch (err) {
    res.status(400).json({err:err})
  }
};

exports.getTaxamento = async (req, res) => {
  try {
    const taxamento = await Taxamento.getTaxamento();
    console.log('teste'+ taxamento.length);
    if(taxamento.length === 0){
      return res.status(409).json({message:'Nenhum registro encontrado!'})
    }
    res.status(200).json(taxamento);
  } catch (err) {
    res.status(409).json({err:err})
  }

};

exports.updateTaxamento = async (req, res) => {
try {
  const id = req.params.id;
  let taxamentoModel = await {
    taxa: req.body.taxa,
    bairro: req.body.bairro
  }
  const updateTaxamento = await Taxamento.updateTaxamento({_id:id},taxamentoModel);
  res.status(200).json(updateTaxamento);
} catch (err) {
  res.status(500).json({err:err})
}
};

exports.removeTaxamento = async (req, res) => {
  try {
    const id = req.params.id;
    const removeTaxamento = await Taxamento.removeTaxamento(id);
    res.status(201).json(removeTaxamento);
  } catch (err) {
    res.status(500).json({err:err})
  }
};