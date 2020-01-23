import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';

import Routes from './routes';

import Header from './components/Header';

// Estrutura de componente:
// Um componente é uma estrutura de dados que vai retornar JSX.
function App() {
  return (
    <div className="App">
      {/* Todas as rotas vão ficar dentro do componente 'BrowserRouter' */}
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;