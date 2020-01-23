import React from 'react'; // Sempre que for utilizar o JSX, tem que fazer essa importação.
import ReactDOM from 'react-dom'; // Integração do React com o Browser, com a árvore de elementos HTML.
import App from './App';

import './style.css'; // Importando CSS.

ReactDOM.render(<App />, document.getElementById('root')); // Renderizando o componente 'App' dentro da tag com id 'root'.