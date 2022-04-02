
const express = require('express');
const mongoose = require('mongoose');

const database = require('./db.config') // ---> conexão local com a base de dados

mongoose.Promise = global.Promise;


// conexão  da base de dados:

mongoose.connect(database.local.localUrlDatabse, { useNewUrlParser :  true, useUnifiedTopology: true  }).then(() =>{
    console.log('A base de dados foi conectada com sucesso');
}, (err) => {
    console.log(` Erro ao conectar com a base de dados ...: ${err}`);
    process.exit();
});
