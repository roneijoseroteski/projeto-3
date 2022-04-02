const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 30,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, {
  timestamps: true,
  collection: 'users'
});


// ---> classe responsavel por criar o hash
userSchema.pre('save', async function (next) {
  // esse this deve conter o modelo de dados quando for salvo
  console.log('entrou aqui metodo save hooks ' + this);
  const user = this;
  console.log('ne ' + user);
  if (user.isModified('password')) {
    //cria o hash com bcrypt
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
// ---> vai gerar uma autenticação para o user
// esse segredo(secret) eo auth do nosso token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // linhas 49 gera o jsonwebtoken
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, 'secret');
  user.tokens = user.tokens.concat({ token });
  console.log('testando onde chegou : ' + user.tokens);
  await user.save();

  return token;
};

// ---> responsavel por fazer uma busca por email ou password do usuario(user)
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error('Login inválido');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('senha inválida!');
  }
  return user;
};
userSchema.statics.getUsers = async () => {
  const user = await User.find();
  return user;

}
userSchema.statics.getUser = async function (iduser) {
  console.log(iduser);
  const getUser = await User.findOne({ _id: iduser })

  return getUser;
}
userSchema.statics.updateUser = async function (iduser, moldelUser) {
  // updateOne() apenas um registro
  const updateUser = await User.updateOne({ _id: iduser }, moldelUser);
  if (updateUser.matchedCount === 0) {  
    return { message: 'Usuário não encontrado' };
  };
  return updateUser;
}
// userSchema.pre('findByIdAndRemove', async function(next){
//     _id: _id
//     await console.log('chegou aqui no remove');
//     next();
// })
userSchema.statics.deleteUser = async function (_id) {
  const user = await User.findOne({ _id: _id });
  console.log('chegou aqui deleteuser ' + user, _id);
  if (user == null) {
    return { message: 'Usuario não encontrado' }
  }
  const removeUser = await User.findByIdAndDelete(user);
  console.log('object: ' + removeUser);
  return removeUser;
}
const User = mongoose.model('User', userSchema);

module.exports = User;