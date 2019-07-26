
const express = require("express");
const app = express();
const handlebars  = require("express-handlebars");
const bodyParser = require('body-parser');
const Post = require('./models/post')

// Config
    //Template Engine
        app.engine('handlebars',handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json());
        
        
// ROTAS
app.get('/cad',function(req,res){
    res.render(__dirname +'/views/layouts/formulario')

});

app.post('/add',function(req,res){

    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo

    }).then(function(){
        res.status(200).send("Post criado com sucesso!")
    }).catch(function(erro){
        res.status(500).send("Houve um erro " + erro);
    });

});



app.listen(8080,function(){
    console.log('Servidor Rodando na porta 8080');
});