const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    // Verificando de o post existe:
    if (!post) {
      return res.status(400).json({ error: 'Post not found' });
    }

    // Incrementando o número de likes em 1:
    post.likes += 1;

    // Salvando o processo no banco de dados:
    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  },
};
