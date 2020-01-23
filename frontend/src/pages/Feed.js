import React, {
  Component
} from 'react';
import io from 'socket.io-client';

import './Feed.css';

import api from '../services/api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  // Conceito de estado:
  // O estado é uma variável que vai armazenar uma variável dentro do componente.
  // Quando o valor dessa variável mudar, essa mudança precisa ser refletida no componente.
  state = {
    feed: [], // Criando a variável 'feed' que vai ser inicializada com um array vazio.
  };

  // Método que da interface Component que é carregado quando o componente foi carregado em tela. 
  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts'); // URL do método 'get' '/posts'.

    // A função 'setState' vai mudar o valor de algum estado.
    this.setState({ feed: response.data }); // Setando e estado 'feed' para receber os dados da API.
  }

  registerToSocket = () => {
    const socket = io('http://localhost:8000');

    // Recebendo as mensagens do tipo 'post' e pegando as informações mandadas 'newPost'.
    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] }); // Colocando o 'newPost' na primeira posição do feed e o resto do feed depois.
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post) // Percorrendo todos os posts e comparando se o ID do post comparado é igual ao post que está sendo curtido, se for, ele retorna o post curtido e a página é atualizada.
      });
    });
  }

  handleLike = id => {
    api.post(`posts/${id}/like`);
  }

  // Quando o componente é uma classe, o método 'render' que deve retornar o JSX.
  render() {
    return (
      <section id="post-list">
        {/* Perdorrendo o estado 'feed' para mostrar todos os posts na tela: */}
        {this.state.feed.map(post => (
          <article className="post" key={post._id}>
            <header>
              <div className="user-info">
                <span className="username">{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} alt="More" />
            </header>

            <img src={`http://localhost:8000/files/${post.image}`} alt="PostImage" />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="" />
                </button>
                <img src={comment} alt="" />
                <img src={send} alt="" />
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span className="hashtags">{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;