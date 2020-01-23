import React, {
  Component
} from 'react';

import './New.css';

import api from '../services/api';

class New extends Component {
  // Armazenando os valores digitados pelo usuário:
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  };

  // A função baixo é Arrow Function porque através desse tipo de função é possível ter acesso
  // a variável global 'this'.
  handleChange = event => {
    // Pegando cada campo e colocando o valor digitado.
    this.setState({ [event.target.name]: event.target.value });
  }

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] }); // Como o input de imagem retorna um array, o que precisamos é só a primeira posição.
  }

  handleSubmit = async event => {
    event.preventDefault(); // Quando o formulário for enviado, a página não vai atualizar.

    // Enviando informações através do 'Multpart form data':
    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    // A propriedade 'history' é herdada do componente 'Routes' que é usado com esse componente 'New'.
    this.props.history.push('/'); // Mandando o usuário para a página inicial.
  }

  render() {
    return (
      <form method="POST" id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange} // Quando o valor mudar, a função vai ser chamada.
          value={this.state.author} // Esse campo referência o estado 'author'.
        />

        <input
          type="text"
          name="place"
          placeholder="Onde a foto foi tirada?"
          onChange={this.handleChange}
          value={this.state.place}
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição de seu post"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />

        <button type="submit">Postar</button>
      </form>
    );
  }
}

export default New;