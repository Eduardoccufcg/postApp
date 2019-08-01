const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/post");

// Config
//Template Engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROTAS

app.get("/home", function(req, res) {
  Post.findAll({ order: [["id", "DESC"]] }).then(function(posts) {
    res.render(__dirname + "/views/layouts/home", { posts: posts });
  });
});

app.get("/form", function(req, res) {
  res.render(__dirname + "/views/layouts/formulario");
});

/*
    Cria um novo post
*/
app.post("/", function(req, res) {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  })
    .then(function() {
      res.redirect("/home");
      //res.status(200).send("Post criado com sucesso!")
    })
    .catch(function(erro) {
      res.status(500).send("Houve um erro " + erro);
    });
});

/*
    Deleta um post pelo id
*/
app.delete("/:id", function(req, res) {
  Post.findByPk(req.params.id).then(post => {
    if (post != null) {
      Post.destroy({ where: { id: req.params.id } })
        .then(function() {
          res.send("Postagem deletada com sucesso!");
        })
        .catch(function(erro) {
          res.send("erro");
        });
    } else {
      res.send("Postagem nao existe!");
    }
  });
});

app.listen(8080, function() {
  console.log("Servidor Rodando na porta 8080");
});
/*
    Atualiza um post
*/
app.put("/:id", function(req, res) {
  Post.findByPk(req.params.id).then(post => {
    if (post != null) {
      Post.update(
        { conteudo: req.body.conteudo },
        { where: { id: req.params.id } }
      )
        .then(function() {
          res.send("Postagem atualizada com sucesso!");
        })
        .catch(function(erro) {
          res.send("erro");
        });
    } else {
      res.send("Postagem nao existe!");
    }
  });
});


