const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const bairroSchema = new Schema({

  bairro: {
    type: String,
    maxlength: 100,
    required: true
  },
}, {
  timestamps: true,
  collection: 'bairro'
});
bairroSchema.statics.getBairro = async () => {
  const getBairro = await bairro.find();
  return getBairro;
};

bairroSchema.statics.updateBairro = async (idBairro, modelBairro) => {
  const updateBairro = await bairro.updateOne({ _id: idBairro }, modelBairro);
  if (updateBairro.matchedCount === 0) {
    return { message: 'Bairro não encontrado!' }
  };
  return { message: 'Bairro atualizado com sucesso!' };
};
bairroSchema.statics.removeBairro = async (idBairro) => {
  const findBairro = await bairro.findOne({ _id: idBairro });
  if (findBairro == null) {
    return { message: 'Bairro não encontrado!' }
  };
  const removeBairro = await bairro.findByIdAndRemove(findBairro);
  return { message: 'Bairro removido com sucesso!' };

}


// bairroSchema.statics.registerBairro = async function (bairro){
//     await  bairro.save();
// }
//timestamps = ADICIONA DUAS PROPRIEDADES DATA DA CRIAÇÃO DO DOCUMENTO E DATA DA ULTIMA ATUALIZAÇÃO
// PRE = E um  hooks que funciona antes de uma ação ser feita, seja save, update, delete, ...
// POS = e apos o evento acontecer
// bairroSchema.pre('findByIdAndRemove', async function (next) {
//     const bairro = this;
//     // bairro.
// })

const bairro = mongoose.model('bairro', bairroSchema);

module.exports = bairro;