const Taxa = require('../models/taxa.models');

exports.registerTaxa = async (req, res) => {
  try {
    const isTaxa = await Taxa.find({taxa: req.body.taxa});
    if(isTaxa.length >= 1){
      return res.status(409).json({message: 'Taxa ja registrada'})
    };
    const newTaxa = new Taxa(req.body);

    const taxa = await newTaxa.save();
    res.status(201).json({ message: 'Taxa created successfully!', taxa })

  } catch (error) {
    res.status(400).json({ err: err })
  }
};

exports.getTaxa = async(req, res) => {
try {
  const taxa = await Taxa.getTaxa();
  if(taxa.length === 0){
    return res.status(409).json({message:'Nenhum registro encontrado!'})
  }
  res.status(200).json(taxa);
} catch (error) {
  res.status(400).json({ err: err })
}
};

exports.updateTaxa = async(req, res) => {
try {
  const id = req.params.id;
  let taxa = await {
    taxa: req.body.taxa
  };
  // console.log('taxa ' + req.body.taxa); tratar patch, e register quando não for colocado nada
  const updateTaxa = Taxa.updateTaxa({_id:id},taxa);
  res.status(200).json(taxa)
} catch (error) {
  res.status(400).json({ err: err })
}
};

exports.removeTaxa = async(req,res) => {
try {
  const idTRaxa = req.params.id;
  const removeTaxa = await Taxa.removeTaxa(idTRaxa);
  res.status(200).json(removeTaxa);
} catch (error) {
  res.status(400).json({ err: err })
}
};