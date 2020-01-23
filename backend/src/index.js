const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const {
  resolve,
} = require('path');


// Criando servidor express e pegando funcionalidades:
const app = express();

const server = require('http').Server(app); // Servidor que tem acesso ao protocolo HTTP e as funcionalidades do express.
const io = require('socket.io')(server); // Fazendo com que nosso servidor possa fazer requisições HTTP e Socket.io.

const routes = require('./routes');

// Conectando com o banco de dados com docker:
mongoose.connect('mongodb://localhost:27017/omnistack7', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Criando um Middleware para que todas as rotas e serviços possam receber informaçoes com Socket.io
app.use((req, res, next) => {
  // A partir de agora, todas as rotas vão ter acesso ao parâmetro 'req.io'
  // para mandar mensagens através de Socket.io
  req.io = io;

  // Garantindo que esse Middleware seja executado nas rotas./
  // Porém que o resto dos códigos das rotas também.
  next();
});

// Com isso, nosso backend poderá ser consumido pelo frontend e mobile.
app.use(cors());

// Confiturando uma rota para identificar cada imagem.
// Agora vai ser possível ter uma URL para cada imagem,
// fazendo a comunicação com o front-end mais fácil.
app.use('/files', express.static(resolve(__dirname, '..', 'uploads', 'resized')));

app.use(express.json());
app.use(routes);

// Servidor rodando na porta 8000:
server.listen(8000);
