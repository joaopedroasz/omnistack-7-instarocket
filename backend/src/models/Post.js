const { Schema, model } = require('mongoose');

// Tabela Post:
const PostSchema = new Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = model('Post', PostSchema); // model() vai receber o nome da tabela ('Post') e a representação da tabela (PostSchema).
