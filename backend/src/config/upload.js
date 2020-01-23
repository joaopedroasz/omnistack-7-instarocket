/*
  Como vamos lidar com Imagens, não vamos utilizar JSON para comunicação entre serviços.
  Vamos utilizar o 'Multipart Form data' para troca informações.
  Para trabalhar com 'Multipart Form data', instalamos a ferramenta 'Multer'.
  Nesse arquivo vamos configurar o 'Multer'.
*/
const multer = require('multer');
const { resolve } = require('path'); // Biblioteca para lidar com caminhos de arquivos.

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    // Configurando o nome do arquivo:
    // req -> requisição que está sendo feita.
    // file -> o arquivo que está sendo analisado.
    // callback -> função que será chamada quando acabar a configuração do nome do arquivo.
    filename: (req, file, callback) => {
      // Configurando para que a imagem guardada tenha o nome original que o usuário upou.
      callback(null, file.originalname);
    },
  }),
};
