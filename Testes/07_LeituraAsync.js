var fs = require('fs');

var LeituraAsync = function(arquivo){
	console.log("Fazendo leitura assíncrona");
	var inicio = new Date().getTime();
	fs.readFile(arquivo);
	var fim = new Date().getTime();
	console.log("Bloqueio assíncrono: "+(fim - inicio)+ "ms");
};

module.exports = LeituraAsync;