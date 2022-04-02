const express = require('express');
const cors = require('cors');
const morgan =  require('morgan');
const mongooseConnection = require('./config/mongooseConnection.config');


const app = express();
app.use(cors());


// Rotas da API: ---> 

const index = require('./routes/index');


// TODO: declarar rota  user.routes.js
const userRoutes = require('./routes/user.routes');
const bairroRoutes = require('./routes/bairro.routes');
const taxaRoutes = require('./routes/taxa.routes');
const taxamentoRoutes = require('./routes/taxamento.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.use(morgan('dev'));
// comando set faz procurar uma string no caso aqui a do banco de dados
app.set('mongoose connection', mongooseConnection);


// registro do index das rotas e dos arquivos de rotas
app.use(index);
app.use('/api/v1',userRoutes);
app.use('/api/v2',bairroRoutes);
app.use('/api/v3',taxaRoutes);
app.use('/api/v4', taxamentoRoutes);
// TOD: incluir depois a chamada da rota 'user.routes.js'


module.exports = app;