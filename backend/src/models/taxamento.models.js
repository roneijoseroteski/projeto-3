const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taxamentoSchema = new Schema({
  taxa: {
    type: Number,
    required: true
  },
  bairro: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'taxamento'
});

taxamentoSchema.statics.getTaxamento = async () => {
  const getTaxamento = await Taxamento.find();
  return getTaxamento;
};

taxamentoSchema.statics.updateTaxamento = async (idTaxamento, taxamentoModels) => {
  const updateTaxamento = await Taxamento.updateOne({_id:idTaxamento},taxamentoModels);
  if(updateTaxamento.matchedCount === 0){
    return {message:'Nenhum registro de taxamento encontrado!'};
  };
  return { message: 'A taxa ou bairro foi atualizado com sucesso!' };
};

taxamentoSchema.statics.removeTaxamento = async (idTaxamento) => {
  const findTaxamento = await Taxamento.findOne({_id:idTaxamento})
  if(findTaxamento == null){
    return {message:'registro não encontrado!'}
  };
  const removeTaxamento = await Taxamento.findByIdAndRemove(findTaxamento);
  return {message:'Taxamento removido com sucesso!'}
};

const Taxamento = mongoose.model('Taxamento', taxamentoSchema);

module.exports = Taxamento;