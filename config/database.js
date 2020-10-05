var mongoose = require('mongoose');

module.exports = function(uri){
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

    mongoose.connection.on('connected', function(){
        console.log('Mongoose conectado em: ' + uri);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose descconectado de: ' + uri);
    });

    mongoose.connection.on('error', function(erro){
        console.log('Mongoose, erro na conexão: ' + erro);
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose descconectado pelo término da aplicação');
            process.exit(0);
        })
    })
}