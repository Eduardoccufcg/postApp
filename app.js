var http = require('http');

http.createServer(function(req,res){

    res.send("Oi");

}).listen(8083);

console.log("O servidor rodando");

