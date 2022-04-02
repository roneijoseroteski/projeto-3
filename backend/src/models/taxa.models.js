const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taxaSchema = new Schema({
  taxa: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: 'taxa'
});

taxaSchema.statics.getTaxa = async () => {
  const getTaxa = await Taxa.find();
  return getTaxa;
};
taxaSchema.statics.updateTaxa = async (idTaxa, taxaModel) => {
  const updateTaxa = await Taxa.updateOne({_id:idTaxa},taxaModel);
  if(updateTaxa.matchedCount === 0){
    return { message: 'Taxa não encontrado!' }
  };
  return { message: 'Taxa atualizada com sucesso!' }
};
taxaSchema.statics.removeTaxa = async (idTaxa) => {
  const findTaxa = await Taxa.findOne({_id: idTaxa});

  if(findTaxa == null){
    return { message:'Taxa não encontrada!' };
  };
  const removeTaxa = await Taxa.findByIdAndRemove(findTaxa);
  console.log('removetaxa : ' + removeTaxa);
  return { message:'Taxa excluida  com sucesso' };

};

const Taxa = mongoose.model('Taxa', taxaSchema)
module.exports = Taxa;