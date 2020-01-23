const express = require('express');
const multer = require('multer');

const uploadsConfig = require('./config/upload');

const LikeController = require('./controllers/LikeController');
const PostController = require('./controllers/PostController');

const routes = express.Router();
// A constante 'upload' vai ter todas as funcionalidades do Multer.
const upload = multer(uploadsConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store); // No parâmetro do meio, estamos informando qual campo está carregando a imagem, com o Multer.

routes.post('/posts/:postId/like', LikeController.store); // No parâmetro do meio, estamos informando qual campo está carregando a imagem, com o Multer.

module.exports = routes; // Exportando todas as rotas criadas.
