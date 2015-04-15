var express = require('express')    // Fremawork Express
  , load = require('express-load')  // Responsável por mapear diretórios para carregar e injetar módulos dentro de uma variável
  , app = express(); 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// Sequencia no Load é !Importante!
// Os models são carregados primeiro, para que os controllers possam usá-las, 
// e por último, os routes usarem toda lógica de seus controllers.
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(3000, function(){
    console.log("Ntalk no ar.");
});