const sharp = require('sharp');
const {
  resolve,
} = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt'); // Pegando todos os posts e ordenando pela data de criação.

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author,
      place,
      description,
      hashtags,
    } = req.body;
    const {
      filename: image, // Pegando a variável 'filename' e usando como 'image'.
      path,
      destination,
    } = req.file;

    const [name] = image.split('.'); // Separando o nome da imagem e a extenção.
    const filename = `${name}.jpg`; // Guambiarra para o nome do arquivo ficar salvo com 'jpg'.

    // Redimensionando o tamanho da imagem:
    // Pegando o caminho até a imagem:
    await sharp(path)
      // Alterando o tamanho da imagem para 500x500 (altura e largura):
      .resize(500)
      // Transformando a imagem em um jpeg com 70% de qualidade:
      .jpeg({
        quality: 70,
      })
      // Informando para aonde a imagem vai ser salva, dentro da pasta 'resized':
      .toFile(
        resolve(destination, 'resized', filename),
      );

    fs.unlinkSync(path); // Excluindo imagens que não estão redimensionadas.

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename,
    });

    // Enviando uma mensagem para todos os serviços ligados a API:
    req.io.emit('post', post); // Primeiro parâmetro: nome da mensagem | Segundo parâmetro: o que vai ser enviado nessa mensagem.

    return res.json(post);
  },
};
